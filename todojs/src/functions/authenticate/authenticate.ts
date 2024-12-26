import {debug} from "../debug";
import {IAppContext, IAuthenticate} from "../../../../backend/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {PAGE_AUTHENTICATE, STORAGE_USER_JWT} from "../../constants";
import {getPage} from "../navigation";

export async function checkAuthenticate(appContext: IAppContext) {

    const userJWT = JSON.parse(await AsyncStorage.getItem(STORAGE_USER_JWT) ?? '{}');

    appContext.auth.authenticate = getAuthenticateValue(userJWT);

    appContext.auth.setAuthenticate(appContext.auth.authenticate);
}

export function getUserId(appContext: IAppContext) {
    return appContext.auth.authenticate !== null ? appContext.auth.authenticate.id : '';
}

export function getAuthenticateValue(authenticate: IAuthenticate) {
    const issetId = typeof authenticate?.payload?.id === 'string'
        && authenticate.payload.id !== '';
    return {
        status: issetId,
        id: issetId ? authenticate.payload.id : '',
    };
}

export function isAuthenticate(appContext: IAppContext) {

    debug(appContext, {
            'isAuthenticate': 1,
            'appContext.auth.authenticate': appContext.auth.authenticate
        },
        // {style: {backgroundColor: 'green'}}
    );

    return appContext.auth.authenticate !== null && appContext.auth.authenticate.status;
}

export async function logout(appContext: IAppContext) {
    appContext.auth.authenticate = getAuthenticateValue({} as IAuthenticate);
    appContext.auth.setAuthenticate(appContext.auth.authenticate);
    await AsyncStorage.removeItem(STORAGE_USER_JWT);
    appContext.nav.setCurrentPage(getPage(PAGE_AUTHENTICATE));
}