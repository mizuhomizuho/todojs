import {createContext, useContext, useEffect, useState} from "react";
import {getCurrentPage, getPage} from "./navigation";
import {PAGE_AUTHENTICATE, PAGE_HOME} from "../constants";
import {checkAuthenticate, isAuthenticate} from "./authenticate/authenticate";
import {api} from "./api";
import {debug} from "./debug";
import {IAppContext, IAuthenticateItem, IItemCommon, IPreloaderItem} from "../../../types";

export const AppContext = createContext<IAppContext | null>(null);

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === null) {
        throw new Error('AppContext is undefined');
    }
    return context;
}

export function useApp() {

    const [currentPage, setCurrentPage] = useState(getPage(PAGE_HOME));
    const [authenticate, setAuthenticate] = useState<IAuthenticateItem>(null);
    const [preloader, setPreloader] = useState<IPreloaderItem>(null);
    const [debugNative, setDebugNative] = useState([]);
    const [todoEditId, setTodoEditId] = useState(null);

    const appContext = {
        nav: {currentPage, setCurrentPage},
        auth: {authenticate, setAuthenticate},
        load: {preloader, setPreloader},
        debug: {debugNative, setDebugNative},
        todoEditId: {value: todoEditId, set: setTodoEditId},
    };

    useEffect(() => {
        debug(appContext, {
                'preloader_change': preloader,
            },
            // {style: {backgroundColor: 'green'}}
        );
        if (preloader === null) {
            init(appContext);
        }
    }, [preloader]);

    useEffect(() => {
        if (authenticate === null) {
            debug(appContext, {
                    'authenticate_bind': 1,
                },
                // {style: {backgroundColor: 'green'}}
            );
            return;
        }
        debug(appContext, {
                'authenticate_init_change': 1,
            },
            // {style: {backgroundColor: 'green'}}
        );
    }, [authenticate]);

    return appContext;
}

export async function query(
    appContext: IAppContext,
    route: string,
    params: IItemCommon
) {
    await api(route, params);
}

async function init(appContext: IAppContext) {
    debug(appContext, {
            'app_init_start': 1,
        },
        // {style: {backgroundColor: 'green'}}
    );
    appContext.load.setPreloader(true);
    await checkAuthenticate(appContext);
    appContext.load.setPreloader(false);
    debug(appContext, {
            'app_init_after_check_auth': 1,
        },
        // {style: {backgroundColor: 'green'}}
    );
    if (!(await isAuthenticate(appContext))) {
        debug(appContext, {
                'app_init_after_check_auth_!isAuthenticate': 1,
            },
            // {style: {backgroundColor: 'green'}}
        );
        appContext.nav.setCurrentPage(getPage(PAGE_AUTHENTICATE));
        return;
    }
    debug(appContext, {
            'app_init_after_auth_good': 1,
        },
        // {style: {backgroundColor: 'green'}}
    );
    const currentPage = await getCurrentPage();
    debug(appContext, {
            'app_init_after_get_cur_page': 1,
        },
        // {style: {backgroundColor: 'green'}}
    );
    appContext.nav.setCurrentPage(currentPage);
}