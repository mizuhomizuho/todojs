
export interface IItemBase {
}

export interface IBackendContext extends IItemBase {
    context: IItemCommon,
}

export interface IItemCommon extends IItemBase {
    [key: string]: any,
}

export interface IStyle extends IItemCommon {
    [key: string]: string | number,
}

export interface IComponentMap extends IItemCommon {
    [key: string]: ReactElement,
}

export interface IItem extends IItemBase {
    id: string,
}

export interface IItemStatus extends IItem {
    label: string,
}

export interface IItemTodo extends IItem {
    name: string,
}

export interface IItemTodoFull extends IItem {
    title: string,
    description: string,
    comments: string,
    status: string,
    deadline: string,
}

export interface IPageItem extends IItem {
    text: string,
    component: string,
}

export interface INavigationItem extends IItem {
    icon?: string,
    iconComponent?: string,
}

export interface IContextBase extends IItemCommon {
}

export interface INavigationContext extends IContextBase {
    currentPage: INavigationItem,
    setCurrentPage: CallableFunction,
}

export type IAuthenticateItem = boolean | null;

export interface IAuthenticateContext extends IContextBase {
    authenticate: IAuthenticateItem,
    setAuthenticate: CallableFunction,
}

export interface IDebugContext extends IContextBase {
    debugNative: IItemCommon,
    setDebugNative: CallableFunction,
}

export type IPreloaderItem = boolean | null;

export interface IPreloaderContext extends IContextBase {
    preloader: IPreloaderItem,
    setPreloader: CallableFunction,
}

export interface ITodoEditIdContext extends IContextBase {
    value: string | null,
    set: CallableFunction,
}

export interface IAppContext extends IContextBase {
    auth: IAuthenticateContext,
    nav: INavigationContext,
    load: IPreloaderContext,
    debug: IDebugContext,
    todoEditId: ITodoEditIdContext,
}

export interface IError extends IItemBase {
    field?: string,
    message: string,
}

export interface IAuthenticate extends IItemBase {
    payload: { username: string },
    token: string,
}

export interface IResult<T> extends IItemBase {
    success: boolean,
    data?: T,
}