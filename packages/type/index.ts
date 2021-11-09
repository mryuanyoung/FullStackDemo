export interface LoginForm {
    account: string,
    password: string,
}

export interface ResponseVO<T> {
    success: boolean,
    msg: string,
    res: T
}

export type LoginResp = ResponseVO<{
    token: string,
    role: string
}>

export class Response<T> implements ResponseVO<T>{
    success: boolean
    msg: string
    res: T

    private constructor() { }

    static success<R>(res: R, msg: string = ''): ResponseVO<R> {
        return {
            success: true,
            msg,
            res
        }
    }

    static fail(msg: string = ''): ResponseVO<null> {
        return {
            success: false,
            res: null,
            msg,
        }
    }
}