import {Dispatch} from 'redux';
import {getAuthUserDataTC} from 'redux/auth-reducer';
import {AppThunk} from 'redux/store';


const initialState = {
    initialized: false,
}

export const appReducer = (state: AppReducerInitialStateType = initialState, action: AuthActionsType): AppReducerInitialStateType => {
    switch (action.type) {
        case 'INITIALIZED':
            return {...state, initialized: true}
        default:
            return state
    }
}


//actions
export const setInitializedAC = () => {
    return {type: 'INITIALIZED'}
}


//thunks
export const initializeTC = (): AppThunk => (dispatch: Dispatch<any>) => {
    const promise = dispatch(getAuthUserDataTC())
    promise.then(() => {
        dispatch(setInitializedAC())
    })
}


//types
type AuthActionsType = ReturnType<typeof setInitializedAC>
export type AppReducerInitialStateType = {
    initialized: boolean
}