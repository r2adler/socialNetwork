import {profileReducer} from './profile-reducer';
import {dialogsReducer} from './dialogs-reducer';
import {usersReducer} from './users-reducer';
import {authReducer} from './auth-reducer';
import {ThunkAction} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AnyAction, configureStore, ThunkDispatch} from '@reduxjs/toolkit';
import {appReducer} from 'redux/app-reducer';


export const store = configureStore({
    reducer: {
        profilePage: profileReducer,
        dialogsPage: dialogsReducer,
        usersPage: usersReducer,
        auth: authReducer,
        app: appReducer
    }
});

export type AppRootStateType = ReturnType<typeof store.getState>;


// @ts-ignore
window.store = store

export default store


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>
type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatchType>()