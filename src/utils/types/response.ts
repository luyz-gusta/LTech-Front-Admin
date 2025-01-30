export default interface ResponseAPI<T>{
    statusCode: number,
    body: T
}

export interface ResponseData<T>{ 
    message: string,
    data: T
}

export interface DefaultResponse<T>{
    statusCode: number,
    body: ResponseData<T>
}