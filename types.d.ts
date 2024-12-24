import {IItemBase, IItemCommon} from "../types";

export interface IItemBase {
}

export interface IItemCommon extends IItemBase {
    [key: string]: any,
}

export interface IStyle extends IItemBase {
    [key: string]: string | number,
}

export interface IComponentMap extends IItemBase {
    [key: string]: ReactElement,
}

export interface IItem extends IItemBase {
    id: string,
}

export interface IItemStatus extends IItemCommon, IItem {
}

export interface IItemTodo extends IItem {
    name: string,
}

export interface IPageItem extends IItem {
    text: string,
    component: string,
}

export interface INavigationItem extends IItem {
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

export interface IUserCreateResult extends IItemBase {
    data: { username: string },
    token: string,
}

export interface IResult<T> extends IItemBase {
    success: boolean,
    data?: T,
}

export interface IResultData<T> extends IItemCommon {
}