import {authAPI} from 'api/api';
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
            return {...state, ...action.data}
        default:
            return state
    }
}



export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {type: 'SET_USER_DATA', data: {userId, email, login, isAuth}}
}



export const getAuthUserDataTC = (): AppThunk => (dispatch: Dispatch<AuthActionsType>) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                const {id, login, email} = response.data.data
                dispatch(setAuthUserData(id, email, login, true))
            }
        })
}
export const logInTC = (email: string, password: string, rememberMe: boolean = false): AppThunk =>
    (dispatch: Dispatch<any>) => {
        authAPI.logIn(email, password, rememberMe)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(getAuthUserDataTC())
                }
            })
    }

export const logOutTC = (): AppThunk =>

    (dispatch: Dispatch<any>) => {
        console.log('logOutTC')
        authAPI.logOut()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserData(null, null, null, false))
                }
            })
    }


type AuthActionsType = ReturnType<typeof setAuthUserData>

export default authReducer
