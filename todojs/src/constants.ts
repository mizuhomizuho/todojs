import {IItemStatus, INavigationItem, IPageItem} from "../../backend/types";

export const STORAGE_NAVIGATION_ID_KEY = 'navigationCurrentPageId';

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
    {id: 'waiting', label: 'Waiting'},
    {id: 'inProgress', label: 'In progress'},
    {id: 'done', label: 'Done'},
];

export const NAVIGATION_ITEMS: INavigationItem[] = [
    {id: PAGE_LIST},
    {id: PAGE_ADD},
];