import {authAPI} from 'api/api';
import {Dispatch} from 'redux';
import {AppThunk} from './store';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';


const slice = createSlice({
    name: 'dialogs',
    initialState: {
        userId: null,
        email: null,
        login: null,
        isAuth: false
    } as AuthInitialStateType,
    reducers: {
        setAuthUserData: (state, action: PayloadAction<{ userId: number | null, email: string | null, login: string | null, isAuth: boolean }>) => {
            return {...state, ...action.payload}
        }
    }
})


export const authReducer = slice.reducer
export const authActions = slice.actions


export const getAuthUserDataTC = (): any => (dispatch: Dispatch<any>) => {
    return authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                const {id, login, email} = response.data.data
                dispatch(authActions.setAuthUserData({userId: id, email, login, isAuth: true}))
            }
        })
}

export const logInTC = (email: string, password: string, rememberMe: boolean = false): AppThunk =>
    (dispatch: Dispatch<any>) => {
        authAPI.logIn(email, password, rememberMe)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(getAuthUserDataTC())
                } else {
                    const message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
                    // dispatch(stopSubmit('login', {_error: message}))
                }
            })
    }

export const logOutTC = (): AppThunk =>

    (dispatch: Dispatch<any>) => {
        console.log('logOutTC')
        authAPI.logOut()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(authActions.setAuthUserData({userId: null, email: null, login: null, isAuth: false}))
                }
            })
    }


export type AuthInitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

