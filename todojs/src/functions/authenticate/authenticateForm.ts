import {useState} from "react";
import {query, useAppContext} from "../app";

import {IAppContext, IAuthenticate} from "../../../../backend/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {STORAGE_USER_JWT} from "../../constants";
import {getCurrentPage} from "../navigation";
import {getAuthenticateValue} from "./authenticate";

export function useAuthenticateForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const appContext = useAppContext();

    return {
        username,
        setUsername,
        password,
        setPassword,
        appContext,
    };
}

export async function handleAuthenticateForm(
    username: string,
    password: string,
    appContext: IAppContext,
) {
    if (!checkAuthenticateForm(username, password)) {
        return;
    }

    appContext.load.setPreloader(true);

    const result = await query('api/user/authenticate', {username, password});

    if (result !== false && typeof result.data.authenticate !== 'undefined') {
        appContext.auth.authenticate = getAuthenticateValue(
            result.data.authenticate as unknown as IAuthenticate);
        appContext.auth.setAuthenticate(appContext.auth.authenticate);
        await AsyncStorage.setItem(STORAGE_USER_JWT, JSON.stringify(result.data.authenticate));
        appContext.nav.setCurrentPage(await getCurrentPage());
        appContext.load.setPreloader(false);
        return;
    }

    appContext.load.setPreloader(false);
}

function checkAuthenticateForm(username: string, password: string) {
    const errors: string[] = [];
    if (!username.trim()) {
        errors.push('Username cannot be empty.');
    }
    if (!password.trim()) {
        errors.push('Password cannot be empty.');
    }
    if (errors.length) {
        alert(errors.join('\n'));
        return false;
    }
    return true;
}