import {Dispatch} from 'redux';
import {AppThunk} from 'redux/store';
import {createSlice} from '@reduxjs/toolkit';
import {authThunks} from 'redux/auth-reducer';


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




//thunks
export const initialize = (): AppThunk => (dispatch: Dispatch<any>) => {
    const promise = dispatch(authThunks.getAuthUserData())
    promise.then(() => {
        dispatch(appActions.setAuthUserData())
    })
}


export const appReducer = slice.reducer
export const appActions = slice.actions
export const appThunks = {initialize}


//types
export type AppInitialStateType = {
    initialized: boolean
}