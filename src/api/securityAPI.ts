import {instance} from 'api/api';


export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<{ url: string }>('/security/get-captcha-url')
    }
}