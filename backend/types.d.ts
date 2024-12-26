import {Request, Response} from "express";
import {PrismaClient} from "@prisma/client";

export interface IBackendContext {
    context: {
        req: Request,
        res: Response,
        prisma: PrismaClient,
    },
}

export interface ICommonObject {
    [key: string]: any,
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

export interface IStringObjectTree {
    [key: string]: string | IStringObjectTree,
}

export interface IStyle {
    [key: string]: string | number,
}

export interface IComponentMap {
    [key: string]: ReactElement,
}

export interface IItem {
    id: string,
}

export interface ITodoItem extends IItem, ITodoItemNew {
}

export interface ITodoItemNew {
    title: string,
    description: string,
    comments: string,
    status: string,
    deadline: string,
    userId: string,
}

export interface IItemStatus extends IItem {
    label: string,
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
    debugNative: ICommonObject,
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

export interface IError {
    field?: string,
    message: string,
}

export interface IAuthenticate {
    payload: { id: string },
    token: string,
}

export interface IResult<T> {
    success: boolean,
    data?: T,
}