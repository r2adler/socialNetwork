import {Dispatch} from 'redux';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserType, usersAPI} from 'api/usersAPI';
import {createAppAsyncThunk} from 'utils/createAppAsyncThunk';
import {ResponseType} from 'api/api';


const slice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        pageSize: 5,
        totalItemsCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
    } as UsersStateType,
    reducers: {
        followSuccess: (state, action: PayloadAction<{ userId: number }>) => {
            const index = state.users.findIndex(u => u.id === action.payload.userId)
            if (index !== -1) {
                state.users[index].followed = true
            }
        },
        unfollowSuccess: (state, action: PayloadAction<{ userId: number }>) => {
            const index = state.users.findIndex(u => u.id === action.payload.userId)
            if (index !== -1) {
                state.users[index].followed = false
            }
        },
        setUsers: (state, action: PayloadAction<{ users: UserType[] }>) => {
            state.users = [...action.payload.users, ...state.users]
        },
        setCurrentPage: (state, action: PayloadAction<{ currentPage: number }>) => {
            state.currentPage = action.payload.currentPage
        },
        setTotalUsersCount: (state, action: PayloadAction<{ totalCount: number }>) => {
            state.totalItemsCount = action.payload.totalCount
        },
        setIsFetching: (state, action: PayloadAction<{ isFetching: boolean }>) => {
            state.isFetching = action.payload.isFetching
        },
        toggleFollowingProgress: (state, action: PayloadAction<{ isFetching: boolean, userId: number }>) => {
            state.followingInProgress = action.payload.isFetching ?
                [...state.followingInProgress, action.payload.userId] :
                state.followingInProgress.filter(id => id !== action.payload.userId)
        }
    }
})


//thunks
const requestUsers = createAppAsyncThunk<void, { page: number, pageSize: number }>('users/requestUsers',
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        dispatch(usersActions.setIsFetching({isFetching: true}))
        dispatch(usersActions.setCurrentPage({currentPage: arg.page}))
        const data = await usersAPI.getUsers(arg.page, arg.pageSize)
        dispatch(usersActions.setIsFetching({isFetching: false}))
        dispatch(usersActions.setUsers({users: data.items}))
        dispatch(usersActions.setTotalUsersCount({totalCount: data.totalCount}))
    })

const onPageChange = createAppAsyncThunk<void, { pageNumber: number, pageSize: number }>('users/onPageChange',
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        dispatch(usersActions.setCurrentPage({currentPage: arg.pageNumber}))
        dispatch(usersActions.setIsFetching({isFetching: true}))
        const res = await usersAPI.getUsers(arg.pageNumber, arg.pageSize)
        dispatch(usersActions.setUsers({users: res.items}))
        dispatch(usersActions.setIsFetching({isFetching: false}))
    })

export const follow = createAppAsyncThunk<void, { userId: number }>('users/follow',
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        await followUnfollowFlow(dispatch, arg.userId, usersAPI.follow, usersActions.followSuccess)
    })

export const unfollow = createAppAsyncThunk<void, { userId: number }>('users/unfollow',
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        await followUnfollowFlow(dispatch, arg.userId, usersAPI.unfollow, usersActions.unfollowSuccess)
    })

const followUnfollowFlow = async (dispatch: Dispatch, userId: number, apiMethod: (userId: number) => Promise<ResponseType>, AC: (payload: { userId: number }) => any) => {
    dispatch(usersActions.toggleFollowingProgress({isFetching: true, userId}))
    const data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(AC({userId}))
    }
    dispatch(usersActions.toggleFollowingProgress({isFetching: false, userId}))
}


export const usersReducer = slice.reducer
export const usersActions = slice.actions
export const usersThunks = {requestUsers, onPageChange, follow, unfollow}


//types
export type UsersStateType = {
    users: UserType[]
    pageSize: number
    totalItemsCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}