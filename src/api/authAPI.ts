import {AxiosResponse} from 'axios';
import {instance, ResponseType} from 'api/api';

export const authAPI = {
    me() {
        return instance.get<ResponseType<GetResponseType>>('auth/me')
    },
    logIn(email: string | null, password: string | null, rememberMe: boolean, captcha: string | null) {
        return instance.post<ResponseType<{ userId: number }>, AxiosResponse<ResponseType<{ userId: number }>>, LoginType>('/auth/login', {
            email,
            password,
            rememberMe,
            captcha
        })
    },
    logOut() {
        return instance.delete<ResponseType>('/auth/login')
    }
}
//types
export type LoginType = {
    email: string | null
    password: string | null
    rememberMe: boolean
    captcha: string | null
}
type GetResponseType = {
    id: number
    email: string
    login: string
}