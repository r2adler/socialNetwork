import {instance} from 'api/api';
import {AxiosResponse} from 'axios';
import {ResponseType} from 'api/api';

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<UsersResponse, AxiosResponse<UsersResponse>, UsersGetArgs>(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data) as Promise<UsersResponse>
    },
    follow(userId: number) {
        return instance.post<ResponseType, AxiosResponse<ResponseType>, { userId: number }>(`follow/${userId}`)
            .then(res => res.data) as Promise<ResponseType>
    },
    unfollow(userId: number) {
        return instance.delete<ResponseType, AxiosResponse<ResponseType>, { userId: number }>(`follow/${userId}`)
            .then(res => res.data) as Promise<ResponseType>
    }
}


// types
type UsersResponse = {
    error: string
    items: UserType[]
    totalCount: number
}
export type UserType = {
    id: number
    name: string
    status: string | null
    photos: Photos
    followed: boolean
    uniqueUrlName: string | null
}
export type Photos = {
    small: string | null
    large: string | null
}
export type UsersGetArgs = {
    currentPage: number
    pageSize: number
}