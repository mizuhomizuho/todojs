import {useState} from "react";
import {query} from "../app";

import {IAppContext} from "../../../../backend/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getPage} from "../navigation";
import {PAGE_ADD, STORAGE_USER_JWT} from "../../constants";

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

    // appContext.nav.setCurrentPage(getPage(PAGE_ADD));

    appContext.load.setPreloader(true);
    const result = await query(appContext, 'api/user/register', {
        username,
        password,
        password2,
    });

    if (result !== false) {
        await AsyncStorage.setItem(STORAGE_USER_JWT, JSON.stringify(result.data));
    }


    console.log(result, 111);

    // await new Promise(resolve => setTimeout(resolve, 1000));
    // appContext.auth.authenticate.isAuthenticated = true;
    // if (!appContext.auth.authenticate.isAuthenticated) {
    //     alert('Authentication failed');
    // }
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