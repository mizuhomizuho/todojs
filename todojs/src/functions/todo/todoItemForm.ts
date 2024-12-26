import {useEffect, useState} from "react";
import {DEADLINE_DAYJS_FORMAT, PAGE_EDIT, STATUS_ITEMS, STORAGE_TODO_ITEM_FORM_PREFIX} from "../../constants";
import dayjs from "dayjs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {IAppContext, IFieldValue, IFormParams, IItemCommon, IStringObject} from "../../../../backend/types";
import {query} from "../app";
import utc from "dayjs/plugin/utc";
import {getPage} from "../navigation";

export function setValue(value: string, isMount: boolean = false) {
    return {isMount: isMount, value: value};
}

export function useTodoItemForm(appContext: IAppContext, storageId: string, editId: string | null) {

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

    bindStorage(appContext, formParams, storagePrefix, editId);

    return getReturnUseTodoItemForm(formParams);
}

export async function handleTodoItemForm(
    appContext: IAppContext,
    title: string,
    description: string,
    status: string,
    comments: string,
    deadline: string,
) {

    if (!checkAuthenticateForm(title, dayjs(deadline).unix())) {
        return;
    }

    appContext.load.setPreloader(true);

    dayjs.extend(utc);

    const result = await query(appContext, 'api/todo/add', {
        title,
        description,
        status,
        comments,
        deadline: dayjs(deadline).utc().unix().toString(),
    });

    let good = false;
    if (result !== false && typeof result?.data?.newItem?.id === 'string') {
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

    let loadedData: IStringObject = {};

    formParams.forEach((item, index) => {
        useEffect(() => {
            (async () => {
                const fieldValue = item.variable as IFieldValue;
                if (fieldValue.isMount) {
                    let storageValue = await AsyncStorage.getItem(storagePrefix + item.variableName);
                    if (storageValue === null && editId) {
                        if (!Object.keys(loadedData).length) {
                            appContext.load.setPreloader(true);
                            const result = await query(appContext, 'api/todo/get', {
                                id: editId,
                            });
                            if (result !== false && typeof result?.data?.item?.id === 'string') {
                                loadedData = result.data.item;
                            }
                            appContext.load.setPreloader(false);
                        }
                        if (typeof loadedData[item.variableName as string] !== 'undefined') {
                            storageValue = loadedData[item.variableName as string];
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
    const result: IItemCommon = {};
    formParams.forEach((item) => {
        result[item.variableName as string] = item.variable;
        result[item.setFunctionName as string] = item.setFunction;
    });
    return result;
}