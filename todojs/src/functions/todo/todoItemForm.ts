import {useEffect, useState} from "react";
import {DEADLINE_DAYJS_FORMAT, PAGE_EDIT} from "../../constants";
import dayjs from "dayjs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {IAppContext, ICommonObject, IFieldValue, IFormParams, ITodoItem, ITodoItemNew} from "../../../../backend/types";
import {query} from "../app";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {getPage} from "../navigation";
import {getFormParams, getStoragePrefix} from "./todo";

let loadedData: ITodoItem | false | null = null;
let isLoadStarted = false;
let formParams: IFormParams[] = [];

export function setValue(value: string, isMount: boolean = false) {
    return {isMount: isMount, value: value};
}

export function useTodoItemForm(appContext: IAppContext, editId: string | null) {

    const formParamItems: IFormParams[] = [];
    Object.entries(getFormParams()).forEach(([key, value], i) => {
        const variable = useState(getDefaultFieldValues());
        formParamItems.push({
            ...value,
            variableName: key,
            variable: variable[0],
            setFunction: variable[1],
        });
    });
    formParams = formParamItems;

    bindStorage(appContext, editId);

    return getReturnUseTodoItemForm();
}

export async function handleTodoItemForm(
    appContext: IAppContext,
    editId: string | null,
    item: ITodoItemNew,
) {

    if (!checkTodoItemForm(item.title, dayjs(item.deadline).unix())) {
        return;
    }

    dayjs.extend(utc);

    let params = {
        ...item,
        deadline: dayjs(item.deadline).utc().unix().toString(),
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
        const dataConverted = convertDataFromServer(
            {...result.data.newItem} as unknown as ITodoItem
        );
        appContext.todoEditId.value = dataConverted.id;
        appContext.todoEditId.set(appContext.todoEditId.value);
        formParams.map(async (item) => {
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

function getDefaultFieldValues(): IFieldValue {
    return {isMount: true, value: ''};
}

function convertDataFromServer(item: ITodoItem) {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    item.deadline = dayjs.tz(+item.deadline * 1000, dayjs.tz.guess()).format(DEADLINE_DAYJS_FORMAT);
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
        loadedData = convertDataFromServer({...result.data.item} as unknown as ITodoItem);
    }
    appContext.load.setPreloader(false);
    return !loadedData ? false : loadedData;
}

function bindStorage(appContext: IAppContext, editId: string | null) {

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

function checkTodoItemForm(title: string, deadline: number) {
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