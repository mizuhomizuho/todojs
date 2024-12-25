import {useState} from "react";
import {query, useAppContext} from "../app";

import {IAppContext} from "../../../../backend/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {STORAGE_USER_JWT} from "../../constants";
import {getCurrentPage} from "../navigation";

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
};

export async function handleAuthenticateForm(
    username: string,
    password: string,
    appContext: IAppContext,
) {
    if (!checkAuthenticateForm(username, password)) {
        return;
    }
    // await new Promise(resolve => setTimeout(resolve, 1000));
    // appContext.auth.authenticate.isAuthenticated = true;
    // if (!appContext.auth.authenticate.isAuthenticated) {
    //     alert('Authentication failed');
    // }

    appContext.load.setPreloader(true);
    const result = await query(appContext, 'api/user/authenticate', {
        username,
        password,
    });
    appContext.load.setPreloader(false);


    if (result !== false && result.data.success === true) {
        appContext.auth.authenticate = true;
        appContext.auth.setAuthenticate(appContext.auth.authenticate);
        await AsyncStorage.setItem(STORAGE_USER_JWT, JSON.stringify(result.data));
        appContext.nav.setCurrentPage(await getCurrentPage());

        console.log(await getCurrentPage());
    }
};

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
};