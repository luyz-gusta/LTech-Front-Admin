export default interface ResponseAPI<T>{
    statusCode: number,
    body: T
}