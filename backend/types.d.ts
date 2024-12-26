
export interface IBackendContext {
    context: IItemCommon,
}

export interface IItemCommon {
    [key: string]: any,
}

export interface IStringObject {
    [key: string]: string,
}

export interface IStringObject {
    [key: string]: string,
}

export interface IFieldValue {
    isMount: boolean,
    value: string,
}

export interface IFormParams {
    [key: string]: string | Function | IFieldValue,
}

export interface IStringResult {
    [key: string]: string | IStringObject,
}

export interface IStyle {
    [key: string]: string | number,
}

export interface IComponentMap {
    [key: string]: ReactElement,
}

export interface IItem  {
    id: string,
}

export interface IItemStatus extends IItem {
    label: string,
}

export interface IItemTodo extends IItem {
    name: string,
}

export interface IPageItem extends IItem {
    text: string,
    component: string,
}

export interface INavigationItem extends IItem {
    icon?: string,
    iconComponent?: string,
}

export interface INavigationContext {
    currentPage: INavigationItem,
    setCurrentPage: Function,
}

export type IAuthenticateItem = boolean | null;

export interface IAuthenticateContext {
    authenticate: IAuthenticateItem,
    setAuthenticate: Function,
}

export interface IDebugContext {
    debugNative: IItemCommon,
    setDebugNative: Function,
}

export type IPreloaderItem = boolean | null;

export interface IPreloaderContext {
    preloader: IPreloaderItem,
    setPreloader: Function,
}

export interface ITodoEditIdContext {
    value: string | null,
    set: Function,
}

export interface IAppContext {
    auth: IAuthenticateContext,
    nav: INavigationContext,
    load: IPreloaderContext,
    debug: IDebugContext,
    todoEditId: ITodoEditIdContext,
    componentMap: IComponentMap,
}

export interface IError  {
    field?: string,
    message: string,
}

export interface IAuthenticate  {
    payload: { username: string },
    token: string,
}

export interface IResult<T>  {
    success: boolean,
    data?: T,
}