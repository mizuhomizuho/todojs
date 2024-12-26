import {
    DEADLINE_DAYJS_FORMAT,
    STATUS_ITEMS,
    STORAGE_TODO_ITEM_FORM_ADD,
    STORAGE_TODO_ITEM_FORM_EDIT_PREFIX
} from "../../constants";
import dayjs from "dayjs";
import {ITodoItem} from "../../../../backend/types";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export function getFormParams() {
    return {
        title: {
            setFunctionName: 'setTitle',
            defaultValue: '',
        },
        description: {
            setFunctionName: 'setDescription',
            defaultValue: '',
        },
        status: {
            setFunctionName: 'setStatus',
            defaultValue: STATUS_ITEMS[0].id,
        },
        comments: {
            setFunctionName: 'setComments',
            defaultValue: '',
        },
        deadline: {
            setFunctionName: 'setDeadline',
            defaultValue: dayjs().add(1, 'hour').format(DEADLINE_DAYJS_FORMAT),
        },
    };
}

export function getStoragePrefix(editId: string | null) {
    return editId
        ? `${STORAGE_TODO_ITEM_FORM_EDIT_PREFIX}-${editId}-`
        : `${STORAGE_TODO_ITEM_FORM_ADD}-`;
}

export function convertDataFromServer(item: ITodoItem) {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    item.deadline = dayjs.tz(+item.deadline * 1000, dayjs.tz.guess()).format(DEADLINE_DAYJS_FORMAT);
    return item;
}