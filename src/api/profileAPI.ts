import {photosItem, ProfileType} from 'redux/profile-reducer';
import {AxiosResponse} from 'axios';
import {instance, ResponseType} from 'api/api';

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>('/profile/status', {status})
    },
    savePhoto(photoFile: File) {
        const formData = new FormData()
        formData.append('image', photoFile)

        return instance.put<ResponseType<{ photos: photosItem }>, AxiosResponse<ResponseType<{ photos: photosItem }>>, FormData>('profile/photo', formData, {headers: {'Content-Type': 'multipart/form-data'}})
    },
    saveProfile(profile: Partial<ProfileType>) {
        return instance.put<ResponseType, AxiosResponse<ResponseType>, Partial<ProfileType>>('profile', profile)
    }
}