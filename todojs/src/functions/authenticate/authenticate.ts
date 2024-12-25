import {debug} from "../debug";

import {IAppContext} from "../../../../backend/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {STORAGE_USER_JWT} from "../../constants";

export async function checkAuthenticate(appContext: IAppContext) {

    // return await new Promise<void>((resolve) => {
    //     setTimeout(() => {
    //         debug(appContext, {
    //                 '---setAuthenticate---': 1,
    //             },
    //             // {style: {backgroundColor: 'green'}}
    //         );
    //         // appContext.auth.authenticate = true;
    //         appContext.auth.authenticate = false;
    //         appContext.auth.setAuthenticate(appContext.auth.authenticate);
    //         resolve();
    //     }, 10);
    // });

    appContext.auth.authenticate = await AsyncStorage.getItem(STORAGE_USER_JWT) !== null;
    // appContext.auth.authenticate = false;
    appContext.auth.setAuthenticate(appContext.auth.authenticate);
}

export function isAuthenticate(appContext: IAppContext) {

    debug(appContext, {
            'isAuthenticate': 1,
            'appContext.auth.authenticate': appContext.auth.authenticate
        },
        // {style: {backgroundColor: 'green'}}
    );

    return typeof appContext.auth.authenticate === 'boolean'
        && appContext.auth.authenticate;
}