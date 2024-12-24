import {useEffect, useState} from "react";
import {STATUS_ITEMS} from "../../constants";
import dayjs from "dayjs";
import {useAppContext} from "../app";
import {IAppContext, IItemCommon} from "../../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {debug} from "../debug";

export const DEADLINE_DAYJS_FORMAT = 'YYYY-MM-DD HH:mm';

export const setValue = (value: string, isMount: boolean = false) => {
    return {isMount: isMount, value: value};
};

export const useTodoItemForm = (appContext: IAppContext, storageId: string, editId: string | null) => {

    const defaultValues: IItemCommon = {isMount: true, value: ''};
    const storagePrefix = `todoItemForm-v6-${storageId}-`;

    const [title, setTitle] = useState(defaultValues);
    const [description, setDescription] = useState(defaultValues);
    const [status, setStatus] = useState(defaultValues);
    const [comments, setComments] = useState(defaultValues);
    const [deadline, setDeadline] = useState(defaultValues);
    
    const formParams = [
        {
            variableName: 'title',
            variable: title,
            setFunctionName: 'setTitle',
            setFunction: setTitle,
            defaultValue: '',
            defaultValue2: 'title1',
        },{
            variableName: 'description',
            variable: description,
            setFunctionName: 'setDescription',
            setFunction: setDescription,
            defaultValue: '',
            defaultValue2: 'description1',
        },{
            variableName: 'status',
            variable: status,
            setFunctionName: 'setStatus',
            setFunction: setStatus,
            defaultValue: STATUS_ITEMS[0].id,
            defaultValue2: STATUS_ITEMS[2].id,
        },{
            variableName: 'comments',
            variable: comments,
            setFunctionName: 'setComments',
            setFunction: setComments,
            defaultValue: '',
            defaultValue2: 'comments1',
        },{
            variableName: 'deadline',
            variable: deadline,
            setFunctionName: 'setDeadline',
            setFunction: setDeadline,
            defaultValue: dayjs().add(1, 'hour').format(DEADLINE_DAYJS_FORMAT),
            defaultValue2: dayjs().add(8, 'hour').format(DEADLINE_DAYJS_FORMAT),
        }
    ];

    loadData(appContext, formParams, editId);

    bindStorage(formParams, storagePrefix);

    return getReturnUseTodoItemForm(formParams);
};

export const handleTodoItemForm = async (
    title: string,
    description: string,
    status: string,
    comments: string,
    deadline: number,
    appContext: IAppContext,
) => {

    if (!checkAuthenticateForm(title, deadline)) {
        return;
    }
    appContext.load.setPreloader(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    appContext.load.setPreloader(false);
};

const bindStorage = (formParams: IItemCommon[], storagePrefix: string) => {
    formParams.forEach((item, index) => {
        useEffect(() => {
            // debug(appContext, {
            //     'setItem': item.variableName,
            //     'item.variable': item.variable,
            // }, {
            //     // style: {backgroundColor: 'green'}
            //     stream: 'todo_edit',
            // });
            (async () => {
                if (item.variable.isMount) {
                    const storageValue = await AsyncStorage.getItem(storagePrefix + item.variableName);
                    item.setFunction(setValue(storageValue === null ? item.defaultValue : storageValue));
                    return;
                }
                await AsyncStorage.setItem(storagePrefix + item.variableName, item.variable.value);
            })();
        }, [item.variable]);
    });
};

const loadData = (appContext: IAppContext, formParams: IItemCommon[], editId: string | null) => {
    if (typeof editId !== 'string') {
        return;
    }
    async function init() {
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                formParams.forEach((item) => {
                    item.setFunction(setValue(item.defaultValue2, true));
                });
                appContext.load.setPreloader(false);
                resolve();
            }, 1500);
        });
    }
    useEffect(() => {
        appContext.load.setPreloader(true);
        init();
    }, []);
};

const checkAuthenticateForm = (
    title: string,
    deadline: number,
) => {
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
};

const getReturnUseTodoItemForm = (formParams: IItemCommon[]) => {
    const result: IItemCommon = {};
    formParams.forEach((item) => {
        result[item.variableName] = item.variable;
        result[item.setFunctionName] = item.setFunction;
    });
    return result;
};