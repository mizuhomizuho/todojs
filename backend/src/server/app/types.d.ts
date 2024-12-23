export interface IItemBase {
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
