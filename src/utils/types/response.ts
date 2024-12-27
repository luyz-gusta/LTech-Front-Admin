export default interface ResponseAPI<T>{
    statusCode: number,
    body: T
}

export interface SuccessResponse<T>{ 
    message: string,
    data: T
}