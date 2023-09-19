import axios from 'axios';

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '28672'
    }
})


// types
export type ResponseType<T = {}> = {
    data: T
    fieldsErrors: []
    messages: Array<string>
    resultCode: number
}
export enum ResultCode {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}
