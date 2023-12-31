import {AppDispatchType, AppRootStateType} from 'redux/store';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType
    dispatch: AppDispatchType
    rejectValue: any
}>()