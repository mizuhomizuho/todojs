import {IAppContext, IItemCommon} from "../types/types";

export let debugStream = 'main';
debugStream = 'todo_edit';

// debugStream = 'none';

// debug(appContext, {
//     'getItem': 1,
//     'title': title,
// }, {
//     // style: {backgroundColor: 'green'}
//     stream: 'todo_edit',
// });

export const debug = (appContext: IAppContext, variables: IItemCommon, params: IItemCommon = {}) => {
    let currentStream = 'main';
    if (typeof params.stream !== 'undefined') {
        currentStream = params.stream;
    }
    if (currentStream !== debugStream) {
        return;
    }
    try {
        appContext.debug.debugNative.push({
            style: typeof params.style !== 'undefined' ? params.style : {},
            dump: JSON.stringify(variables),
        });
    } catch (e) {
        appContext.debug.debugNative.push({
            style: {},
            dump: JSON.stringify({
                'dump_error': 1,
                'e': e,
            }),
        });
        console.log('dump_error', e);
    }
    console.log(variables);
};