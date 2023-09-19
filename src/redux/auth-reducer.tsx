import {ResultCode} from 'api/api';
import {Dispatch} from 'redux';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {securityAPI} from 'api/securityAPI';
import {authAPI, LoginType} from 'api/authAPI';
import {createAppAsyncThunk} from 'utils/createAppAsyncThunk';


const slice = createSlice({
    name: 'dialogs',
    initialState: {
        userId: null,
        email: null,
        login: null,
        isAuth: false,
        captcha: null
    } as AuthInitialStateType,
    reducers: {
        setAuthUserData: (state, action: PayloadAction<{ userId: number | null, email: string | null, login: string | null, isAuth: boolean, captcha: string | null }>) => {
            state = action.payload
            return state
        },
        getCaptcha: (state, action: PayloadAction<{ captcha: string | null }>) => {
            state.captcha = action.payload.captcha
            return state
        }
    }
})


const getAuthUserData = (): any => (dispatch: Dispatch<any>) => {
    return authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                const {id, login, email} = response.data.data
                dispatch(authActions.setAuthUserData({userId: id, email, login, isAuth: true, captcha: null}))
            }
        })
}

const logIn = createAppAsyncThunk<void, LoginType>(
    'auth/logIn',
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        const res = await authAPI.logIn(arg.email, arg.password, arg.rememberMe, arg.captcha)
        if (res.data.resultCode === 0) {
            dispatch(getAuthUserData())
            dispatch(authActions.getCaptcha({captcha: null}))
        } else {
            if (res.data.resultCode === ResultCode.CaptchaIsRequired) {
                dispatch(getCaptchaThunk())
            }
            const message = res.data.messages.length > 0 ? res.data.messages[0] : 'Some error'
            return rejectWithValue(message)
        }
    }
)

const logOut = createAppAsyncThunk('auth/logOut',
    async (_, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        const res = await authAPI.logOut()
        if (res.data.resultCode === 0) {
            dispatch(authActions.setAuthUserData({
                userId: null,
                email: null,
                login: null,
                isAuth: false,
                captcha: null
            }))
        } else {
            return rejectWithValue(null)
        }
    })

const getCaptchaThunk = createAppAsyncThunk('auth/getCaptcha',
    async (_, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        const res = await securityAPI.getCaptchaUrl()
        const captcha = res.data.url
        dispatch(authActions.getCaptcha({captcha}))
    })


export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = {getCaptchaThunk, logOut, logIn, getAuthUserData}


// types
export type AuthInitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captcha?: string | null
}

