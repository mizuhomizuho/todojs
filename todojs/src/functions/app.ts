import {createContext, useContext, useEffect, useState} from "react";
import {getCurrentPage, getPage} from "./navigation";
import {PAGE_AUTHENTICATE, PAGE_HOME} from "../constants";
import {checkAuthenticate, isAuthenticate} from "./authenticate/authenticate";
import {api} from "./api";
import {IAppContext, IAuthenticateItem, IComponentMap, IPreloaderItem, IStringObject} from "../../../backend/types";

export const AppContext = createContext<IAppContext | null>(null);

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === null) {
        throw new Error('AppContext is undefined');
    }
    return context;
}

export function useApp(componentMap: IComponentMap) {

    const [currentPage, setCurrentPage] = useState(getPage(PAGE_HOME));
    const [authenticate, setAuthenticate] = useState<IAuthenticateItem>(null);
    const [preloader, setPreloader] = useState<IPreloaderItem>(null);
    const [todoEditId, setTodoEditId] = useState(null);

    const appContext = {
        nav: {currentPage, setCurrentPage},
        auth: {authenticate, setAuthenticate},
        load: {preloader, setPreloader},
        todoEditId: {value: todoEditId, set: setTodoEditId},
        componentMap,
    };

    useEffect(() => {
        if (preloader === null) {
            (async () => await init(appContext))();
        }
    }, [preloader]);

    return appContext;
}

export async function query(
    appContext: IAppContext,
    route: string,
    params: IStringObject
) {
    return await api(route, params);
}

async function init(appContext: IAppContext) {
    appContext.load.setPreloader(true);
    await checkAuthenticate(appContext);
    appContext.load.setPreloader(false);
    if (!(await isAuthenticate(appContext))) {
        appContext.nav.setCurrentPage(getPage(PAGE_AUTHENTICATE));
        return;
    }
    const currentPage = await getCurrentPage();
    appContext.nav.setCurrentPage(currentPage);
}