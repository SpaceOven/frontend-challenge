export interface IData<T> {
    objects?: T[];
    object?: T;
}
export interface IGetListResponse<T> {
    data: IData<T>;
}

export interface IGetResponse<T> {
    data: T;
}

export interface IObjectErrorCollections {
    [key: string]: string[];
}

export interface IValidationError {
    [key: string]: IObjectErrorCollections;
}

export interface IResponseError {
    status: number;
    data?: IValidationError;
}