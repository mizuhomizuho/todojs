import {IAppContext} from "../../types/types";
import {useState} from "react";
import {query} from "../app";

export const useRegisterForm = () => {

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
};

export const handleRegisterForm = async (
    username: string,
    password: string,
    password2: string,
    appContext: IAppContext,
) => {
    if (!checkRegisterForm(username, password, password2)) {
        return;
    }
    appContext.load.setPreloader(true);
    const result = await query(appContext, 'api/user/register', {
        username,
        password,
        password2,
    });

    console.log(result);

    // await new Promise(resolve => setTimeout(resolve, 1000));
    // appContext.auth.authenticate.isAuthenticated = true;
    // if (!appContext.auth.authenticate.isAuthenticated) {
    //     alert('Authentication failed');
    // }
    appContext.load.setPreloader(false);
};

const checkRegisterForm = (username: string, password: string, password2: string) => {
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
};