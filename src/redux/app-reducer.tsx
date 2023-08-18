import {Dispatch} from 'redux';
import {getAuthUserDataTC} from 'redux/auth-reducer';
import {AppThunk} from 'redux/store';
import {createSlice} from '@reduxjs/toolkit';


const slice = createSlice({
    name: 'dialogs',
    initialState: {
        initialized: false,
    } as AppInitialStateType,
    reducers: {
        setAuthUserData: (state) => {
            state.initialized = true
        }
    }
})


export const appReducer = slice.reducer
export const appActions = slice.actions


//thunks
export const initializeTC = (): AppThunk => (dispatch: Dispatch<any>) => {
    const promise = dispatch(getAuthUserDataTC())
    promise.then(() => {
        dispatch(appActions.setAuthUserData())
    })
}


//types
export type AppInitialStateType = {
    initialized: boolean
}