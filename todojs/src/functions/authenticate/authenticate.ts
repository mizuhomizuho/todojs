import {debug} from "../debug";

import {IAppContext} from "../../../types";

export async function checkAuthenticate(appContext: IAppContext) {
    return await new Promise<void>((resolve) => {
        setTimeout(() => {
            debug(appContext, {
                    '---setAuthenticate---': 1,
                },
                // {style: {backgroundColor: 'green'}}
            );
            // appContext.auth.authenticate = true;
            appContext.auth.authenticate = false;
            appContext.auth.setAuthenticate(appContext.auth.authenticate);
            resolve();
        }, 10);
    });
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