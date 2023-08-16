import axios, {AxiosResponse} from 'axios';


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '28672'
    }
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId: number) {
        console.log('Obsolete method. Please use profileAPI')
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType, AxiosResponse<ResponseType>, { status: string }>('/profile/status', {status})
    }

}

export const authAPI = {
    me() {
        return instance.get<ResponseType<GetResponseType>>('auth/me')
    },
    logIn(email: string, password: string, rememberMe: boolean) {
        return instance.post<ResponseType<{userId: number}>, AxiosResponse<ResponseType<{userId: number}>>, LoginType>('/auth/login', {email, password, rememberMe})
    },
    logOut() {
        return instance.delete<ResponseType>('/auth/login')
    }
}
type LoginType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: boolean
}
type GetResponseType = {
    id: number
    email: string
    login: string
}
type ResponseType<T = {}> = {
    data: T
    fieldsErrors: []
    messages: Array<string>
    resultCode: number
}