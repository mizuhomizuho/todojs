import {useState} from "react";
import {query} from "../app";

import {IAppContext, IAuthenticate} from "../../../../backend/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getCurrentPage} from "../navigation";
import {STORAGE_USER_JWT} from "../../constants";
import {getAuthenticateValue} from "./authenticate";

export function useRegisterForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    return {
        username,
        setUsername,
        password,
        setPassword,
        password2,
        setPassword2,
    };
}

export async function handleRegisterForm(
    username: string,
    password: string,
    password2: string,
    appContext: IAppContext,
) {

    if (!checkRegisterForm(username, password, password2)) {
        return;
    }

    appContext.load.setPreloader(true);

    const result = await query('api/user/register', {
        username,
        password,
        password2,
    });

    if (result !== false && typeof result.data.authenticate !== 'undefined') {
        appContext.auth.setAuthenticate(
            getAuthenticateValue(result.data.authenticate as unknown as IAuthenticate));
        await AsyncStorage.setItem(STORAGE_USER_JWT, JSON.stringify(result.data.authenticate));
        appContext.nav.setCurrentPage(await getCurrentPage());
        appContext.load.setPreloader(false);
        return;
    }

    appContext.load.setPreloader(false);
}

function checkRegisterForm(username: string, password: string, password2: string) {
    const errors: string[] = [];
    if (!username.trim()) {
        errors.push('Username cannot be empty.');
    }
    if (!password.trim()) {
        errors.push('Password cannot be empty.');
    }
    if (password !== password2) {
        errors.push('Passwords do not match.');
    }
    if (errors.length) {
        alert(errors.join('\n'));
        return false;
    }
    return true;
}