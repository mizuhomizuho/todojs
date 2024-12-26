import {IItemStatus, INavigationItem, IPageItem} from "../../backend/types";

const TODO_STATUS = {
    WAITING: 'WAITING',
    IN_PROGRESS: 'IN_PROGRESS',
    DONE: 'DONE',
};

export const STORAGE_NAVIGATION_ID = 'navigationCurrentPageId';
export const STORAGE_USER_JWT = 'authenticateUserJWT-v3';
export const STORAGE_TODO_ITEM_FORM_EDIT_PREFIX = 'todoItemFormEditStorage-v15';
export const STORAGE_TODO_ITEM_FORM_ADD = 'todoItemFormAddStorage';

export const DEADLINE_DAYJS_FORMAT = 'YYYY-MM-DD HH:mm';

export const PAGE_HOME = 'home';
export const PAGE_LIST = 'todoList';
export const PAGE_ADD = 'todoAdd';
export const PAGE_EDIT = 'todoEdit';
export const PAGE_AUTHENTICATE = 'authenticate';
export const PAGE_REGISTER = 'register';

export const PAGE_ITEMS: IPageItem[] = [
    {
        id: PAGE_REGISTER,
        text: 'Register',
        component: 'PageRegister',
    },
    {
        id: PAGE_LIST,
        text: 'List',
        component: 'PageTodoList',
    },
    {
        id: PAGE_ADD,
        text: 'Add',
        component: 'PageTodoAdd',
    },
    {
        id: PAGE_EDIT,
        text: 'Edit',
        component: 'PageTodoEdit',
    },
    {
        id: PAGE_AUTHENTICATE,
        text: 'Authenticate',
        component: 'PageAuthenticate',
    },
    {
        id: PAGE_HOME,
        text: 'Home',
        component: 'PageHome',
    },
];

export const STATUS_ITEMS: IItemStatus[] = [
    {id: TODO_STATUS.WAITING, label: 'Waiting'},
    {id: TODO_STATUS.IN_PROGRESS, label: 'In progress'},
    {id: TODO_STATUS.DONE, label: 'Done'},
];

export const NAVIGATION_ITEMS: INavigationItem[] = [
    {id: PAGE_LIST, icon: 'checklist', iconComponent: 'MaterialIcons'},
    {id: PAGE_ADD, icon: 'post-add', iconComponent: 'MaterialIcons'},
];