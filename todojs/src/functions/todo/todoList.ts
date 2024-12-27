import {useEffect, useMemo, useState} from "react";
import {IAppContext, ITodoItem} from "../../../../backend/types";
import {query} from "../app";
import {PAGE_EDIT, STORAGE_TODO_LIST, TODO_STATUS} from "../../constants";
import {getPage} from "../navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFormParams, getStoragePrefix} from "./todo";

export function useTodoList(appContext: IAppContext) {

    const [tidoItems, setTidoItems] = useState<ITodoItem[]>([]);

    useEffect(() => {
        loadData(appContext, setTidoItems);
    }, []);

    return {tidoItems, setTidoItems};
}

export function editItem(appContext: IAppContext, itemId: string) {
    appContext.todoEditId.set(itemId);
    appContext.nav.setCurrentPage(getPage(PAGE_EDIT));
}

export async function deleteItem(
    appContext: IAppContext,
    itemId: string,
    tidoItems: ITodoItem[],
    setTidoItems: Function,
) {
    const item = [...tidoItems].find(item => item.id === itemId);
    if (typeof item !== 'undefined' && item.status === TODO_STATUS.DONE) {
        alert('You cannot delete an item with the status "completed".');
        return;
    }
    appContext.load.setPreloader(true);
    const result = await query(appContext, 'api/todo/delete', {id: itemId});
    if (result !== false && typeof result?.data?.item === 'object') {
        setTidoItems([...tidoItems].filter(item => item.id !== itemId));
        Object.keys(getFormParams()).map(async (variableName) => {
            await AsyncStorage.removeItem(getStoragePrefix(itemId) + variableName);
        });
    }
    appContext.load.setPreloader(false);
}

async function loadData(appContext: IAppContext, setTidoItems: Function) {
    appContext.load.setPreloader(true);
    const result = await query(appContext, 'api/todo/list', {});
    if (result !== false && typeof result?.data?.list === 'object') {
        setTidoItems(result.data.list);
    }
    appContext.load.setPreloader(false);
}
