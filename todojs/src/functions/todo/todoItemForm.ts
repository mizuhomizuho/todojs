import {useEffect, useState} from "react";
import {DEADLINE_DAYJS_FORMAT, PAGE_EDIT, STATUS_ITEMS, STORAGE_TODO_ITEM_FORM_PREFIX} from "../../constants";
import dayjs from "dayjs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {IAppContext, ICommonObject, IFieldValue, IFormParams, INewTodoItem, ITodoItem} from "../../../../backend/types";
import {query} from "../app";
import utc from "dayjs/plugin/utc";
import {getPage} from "../navigation";

export function setValue(value: string, isMount: boolean = false) {
    return {isMount: isMount, value: value};
}

export function useTodoItemForm(appContext: IAppContext, editId: string | null) {

    const storageId = editId ? 'editStorage-' + editId : 'addStorage';

    const defaultValues: IFieldValue = {isMount: true, value: ''};
    const storagePrefix = getStoragePrefix(storageId);

    const [title, setTitle] = useState(defaultValues);
    const [description, setDescription] = useState(defaultValues);
    const [status, setStatus] = useState(defaultValues);
    const [comments, setComments] = useState(defaultValues);
    const [deadline, setDeadline] = useState(defaultValues);

    const formParams: IFormParams[] = [
        {
            variableName: 'title',
            variable: title,
            setFunctionName: 'setTitle',
            setFunction: setTitle,
            defaultValue: '',
            defaultValue2: 'title1',
        }, {
            variableName: 'description',
            variable: description,
            setFunctionName: 'setDescription',
            setFunction: setDescription,
            defaultValue: '',
            defaultValue2: 'description1',
        }, {
            variableName: 'status',
            variable: status,
            setFunctionName: 'setStatus',
            setFunction: setStatus,
            defaultValue: STATUS_ITEMS[0].id,
            defaultValue2: STATUS_ITEMS[2].id,
        }, {
            variableName: 'comments',
            variable: comments,
            setFunctionName: 'setComments',
            setFunction: setComments,
            defaultValue: '',
            defaultValue2: 'comments1',
        }, {
            variableName: 'deadline',
            variable: deadline,
            setFunctionName: 'setDeadline',
            setFunction: setDeadline,
            defaultValue: dayjs().add(1, 'hour').format(DEADLINE_DAYJS_FORMAT),
            defaultValue2: dayjs().add(8, 'hour').format(DEADLINE_DAYJS_FORMAT),
        }
    ];

    // dayjs.extend(utc);
    // const unixTimestamp = new Date().getTime() - 3600 * 1000;
    // const utcDateTime = dayjs.utc(unixTimestamp).utc();
    // console.log(new Date(), utcDateTime.format(),  dayjs(new Date().getTime()));

    bindStorage(appContext, formParams, storagePrefix, editId);

    return getReturnUseTodoItemForm(formParams);
}

export async function handleTodoItemForm(
    appContext: IAppContext,
    editId: string | null,
    item: INewTodoItem,
) {

    const {

        title,
        description,
        status,
        comments,
        deadline,

    } = item;

    if (!checkAuthenticateForm(title, dayjs(deadline).unix())) {
        return;
    }

    appContext.load.setPreloader(true);

    dayjs.extend(utc);

    let params = {
        title,
        description,
        status,
        comments,
        deadline: dayjs(deadline).utc().unix().toString(),
    };

    if (editId) {
        params = {...params, ...{id: editId}};
    }

    const result = await query(appContext, `api/todo/${editId ? 'edit' : 'add'}`, params);

    let good = false;
    if (result !== false && typeof result?.data?.newItem === 'object') {
        appContext.todoEditId.set(result.data.newItem.id);
        appContext.nav.setCurrentPage(getPage(PAGE_EDIT));
        good = true;
    }
    if (!good) {
        alert('Error');
    }

    appContext.load.setPreloader(false);
}

function bindStorage(
    appContext: IAppContext,
    formParams: IFormParams[],
    storagePrefix: string,
    editId: string | null
) {

    let loadedData: ITodoItem | false | null = null;
    let isLoadStarted = false;

    async function loadData(editId: string): Promise<false | ITodoItem> {
        if (isLoadStarted) {
            return new Promise((resolve) => {
                const interval = setInterval(() => {
                    if (loadedData !== null) {
                        console.log(666);
                        clearInterval(interval);
                        resolve(loadedData);
                    }
                }, 100);
            });
        }
        isLoadStarted = true;
        appContext.load.setPreloader(true);
        const result = await query(appContext, 'api/todo/get', {
            id: editId,
        });
        if (result !== false && typeof result?.data?.item === 'object') {
            loadedData = {...result.data.item} as unknown as ITodoItem;
            dayjs.extend(utc);
            const localUnixTime = +loadedData.deadline + dayjs().utcOffset() * 60;
            loadedData.deadline = dayjs(localUnixTime * 1000).format(DEADLINE_DAYJS_FORMAT);
        }
        appContext.load.setPreloader(false);
        return !loadedData ? false : loadedData;
    }

    formParams.forEach((item, index) => {
        useEffect(() => {
            (async () => {
                const fieldValue = item.variable as IFieldValue;
                if (fieldValue.isMount) {
                    let storageValue = await AsyncStorage.getItem(storagePrefix + item.variableName);
                    if (storageValue === null && editId) {
                        if (loadedData === null) {
                            console.log(loadedData, 444);
                            loadedData = await loadData(editId);
                            console.log(loadedData, 555);
                        }
                        if (loadedData && typeof loadedData[item.variableName as keyof ITodoItem] !== 'undefined') {
                            storageValue = loadedData[item.variableName as keyof ITodoItem];
                            console.log(storageValue, 111);
                        }
                    }
                    const setFunction = item.setFunction as Function;
                    setFunction(setValue(storageValue === null ? item.defaultValue as string : storageValue));
                    return;
                }
                await AsyncStorage.setItem(storagePrefix + item.variableName, fieldValue.value);
            })();
        }, [item.variable]);
    });
}

function getStoragePrefix(storageId: string) {
    return `${STORAGE_TODO_ITEM_FORM_PREFIX}-${storageId}-`;
}

function checkAuthenticateForm(
    title: string,
    deadline: number,
) {
    const errors: string[] = [];
    if (!title.trim()) {
        errors.push('Title cannot be empty.');
    }

    console.log(+deadline, dayjs().unix());

    if (deadline < dayjs().unix()) {
        errors.push('You cannot create tasks for past time.');
    }
    if (errors.length) {
        alert(errors.join('\n'));
        return false;
    }
    return true;
}

function getReturnUseTodoItemForm(formParams: IFormParams[]) {
    const result: ICommonObject = {};
    formParams.forEach((item) => {
        result[item.variableName as string] = item.variable;
        result[item.setFunctionName as string] = item.setFunction;
    });
    return result;
}