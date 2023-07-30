import {authAPI} from '../api/api';
import {Dispatch} from 'redux';
import {AppThunk} from './store';

export type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}


const initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {...state, ...action.data, isAuth: true}
        default:
            return state
    }
}



export const setAuthUserData = (userId: number | null, email: string | null, login: string | null) => {
    return {type: 'SET_USER_DATA', data: {userId, email, login}}
}



export const getAuthUserDataTC = (): AppThunk => (dispatch: Dispatch<AuthActionsType>) => {

    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                const {userId, login, email} = response.data.data

                dispatch(setAuthUserData(userId, email, login))
            }
        })
}

type AuthActionsType = ReturnType<typeof setAuthUserData>

export default authReducer
