import {useEffect, useState} from "react";
import {
    DEADLINE_DAYJS_FORMAT,
    PAGE_EDIT,
    STATUS_ITEMS,
    STORAGE_TODO_ITEM_FORM_ADD,
    STORAGE_TODO_ITEM_FORM_EDIT_PREFIX
} from "../../constants";
import dayjs from "dayjs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {IAppContext, ICommonObject, IFieldValue, IFormParams, ITodoItem, ITodoItemNew} from "../../../../backend/types";
import {query} from "../app";
import utc from "dayjs/plugin/utc";
import {getPage} from "../navigation";

let loadedData: ITodoItem | false | null = null;
let isLoadStarted = false;
let formParams: IFormParams[] = [];

export function setValue(value: string, isMount: boolean = false) {
    return {isMount: isMount, value: value};
}

export function useTodoItemForm(appContext: IAppContext, editId: string | null) {

    const defaultValues: IFieldValue = {isMount: true, value: ''};

    const [title, setTitle] = useState(defaultValues);
    const [description, setDescription] = useState(defaultValues);
    const [status, setStatus] = useState(defaultValues);
    const [comments, setComments] = useState(defaultValues);
    const [deadline, setDeadline] = useState(defaultValues);

    formParams = [
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

    bindStorage(appContext, editId);

    return getReturnUseTodoItemForm();
}

export async function handleTodoItemForm(
    appContext: IAppContext,
    editId: string | null,
    item: ITodoItemNew,
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

    appContext.load.setPreloader(true);
    const result = await query(
        appContext,
        `api/todo/${editId ? 'edit' : 'add'}`,
        params
    );
    if (result !== false && typeof result?.data?.newItem === 'object') {
        const dataConverted = convertToDataFromServer(
            {...result.data.newItem} as unknown as ITodoItem
        );
        appContext.todoEditId.value = dataConverted.id;
        appContext.todoEditId.set(appContext.todoEditId.value);
        formParams.map(async (item, index) => {
            await AsyncStorage.removeItem(getStoragePrefix(null) + item.variableName);
            await AsyncStorage.setItem(
                getStoragePrefix(dataConverted.id) + item.variableName,
                dataConverted[item.variableName as keyof ITodoItem],
            );
        });
        appContext.nav.setCurrentPage(getPage(PAGE_EDIT));
    }
    appContext.load.setPreloader(false);
}

function convertToDataFromServer(item: ITodoItem) {
    dayjs.extend(utc);
    const localUnixTime = +item.deadline + dayjs().utcOffset() * 60;
    item.deadline = dayjs(localUnixTime * 1000).format(DEADLINE_DAYJS_FORMAT);
    return item;
}

async function loadData(appContext: IAppContext, editId: string): Promise<false | ITodoItem> {
    if (isLoadStarted) {
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                if (loadedData !== null) {
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
        loadedData = convertToDataFromServer({...result.data.item} as unknown as ITodoItem);
    }
    appContext.load.setPreloader(false);
    return !loadedData ? false : loadedData;
}

function getStoragePrefix(editId: string | null) {
    return editId
        ? `${STORAGE_TODO_ITEM_FORM_EDIT_PREFIX}-${editId}-`
        : `${STORAGE_TODO_ITEM_FORM_ADD}-`;
}

function bindStorage(
    appContext: IAppContext,
    editId: string | null
) {

    const storagePrefix = getStoragePrefix(editId);

    formParams.forEach((item, index) => {
        useEffect(() => {
            (async () => {
                const fieldValue = item.variable as IFieldValue;
                if (fieldValue.isMount) {
                    let storageValue = await AsyncStorage.getItem(storagePrefix + item.variableName);
                    if (storageValue === null && editId) {
                        if (loadedData === null) {
                            loadedData = await loadData(appContext, editId);
                        }
                        if (loadedData && typeof loadedData[item.variableName as keyof ITodoItem] !== 'undefined') {
                            storageValue = loadedData[item.variableName as keyof ITodoItem];
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

function checkAuthenticateForm(
    title: string,
    deadline: number,
) {
    const errors: string[] = [];
    if (!title.trim()) {
        errors.push('Title cannot be empty.');
    }
    if (deadline < dayjs().unix()) {
        errors.push('You cannot create tasks for past time.');
    }
    if (errors.length) {
        alert(errors.join('\n'));
        return false;
    }
    return true;
}

function getReturnUseTodoItemForm() {
    const result: ICommonObject = {};
    formParams.forEach((item) => {
        result[item.variableName as string] = item.variable;
        result[item.setFunctionName as string] = item.setFunction;
    });
    return result;
}