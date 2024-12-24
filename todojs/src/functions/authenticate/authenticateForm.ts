import {useState} from "react";
import {useAppContext} from "../app";

import {IAppContext} from "../../../../types";

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
    appContext.load.setPreloader(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    // appContext.auth.authenticate.isAuthenticated = true;
    // if (!appContext.auth.authenticate.isAuthenticated) {
    //     alert('Authentication failed');
    // }
    appContext.load.setPreloader(false);
};

function checkAuthenticateForm(username: string, password: string) {
    // const errors: string[] = [];
    // if (!username.trim()) {
    //     errors.push('Username cannot be empty.');
    // }
    // if (!password.trim()) {
    //     errors.push('Password cannot be empty.');
    // }
    // if (errors.length) {
    //     alert(errors.join('\n'));
    //     return false;
    // }
    return true;
};