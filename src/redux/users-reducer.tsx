import {Dispatch} from 'redux';
import {AppThunk} from './store';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {usersAPI} from 'api/usersAPI';
import {createAppAsyncThunk} from 'utils/createAppAsyncThunk';

export type UserType = {
    name: string
    id: number
    uniqueUrlName: any
    photos: {
        small: any
        large: any
    }
    status: string
    followed: boolean
}
export type InitialStateType = {
    users: UserType[]
    pageSize: number
    totalItemsCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}

const slice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        pageSize: 5,
        totalItemsCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
    } as InitialStateType,
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
export const requestUsers = createAppAsyncThunk<void, { page: number, pageSize: number }>('users/requestUsersTC',
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        dispatch(usersActions.setIsFetching({isFetching: true}))
        dispatch(usersActions.setCurrentPage({currentPage: arg.page}))
        usersAPI.getUsers(arg.page, arg.pageSize)
            .then(data => {
                dispatch(usersActions.setIsFetching({isFetching: false}))
                dispatch(usersActions.setUsers({users: data.items}))
                dispatch(usersActions.setTotalUsersCount({totalCount: data.totalCount}))
            })
    })

export const onPageChangeTC = (pageNumber: number, pageSize: number): AppThunk => (dispatch: Dispatch<any>) => {
    dispatch(usersActions.setCurrentPage({currentPage: pageNumber}))
    dispatch(usersActions.setIsFetching({isFetching: true}))

    usersAPI.getUsers(pageNumber, pageSize)
        .then(data => {
            dispatch(usersActions.setUsers({users: data.items}))
            dispatch(usersActions.setIsFetching({isFetching: false}))
        })
}

// export const followTC = (userId: number): AppThunk => (dispatch: Dispatch<any>) => {
//     dispatch(usersActions.toggleFollowingProgress({isFetching: true, userId}))
//     usersAPI.follow(userId)
//         .then(response => {
//             if (response.data.resultCode === 0) {
//                 dispatch(usersActions.followSuccess({userId}))
//             }
//             dispatch(usersActions.toggleFollowingProgress({isFetching: false, userId}))
//         })
// }
//
// export const unfollowTC = (userId: number): AppThunk => (dispatch: Dispatch<any>) => {
//     dispatch(usersActions.toggleFollowingProgress({isFetching: true, userId}))
//     usersAPI.unfollow(userId)
//         .then(response => {
//             if (response.data.resultCode === 0) {
//                 dispatch(usersActions.unfollowSuccess({userId}))
//             }
//             dispatch(usersActions.toggleFollowingProgress({isFetching: false, userId}))
//         })
// }


export const followTC = (userId: number): AppThunk => (dispatch: Dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.follow, usersActions.followSuccess)
}

export const unfollowTC = (userId: number): AppThunk => (dispatch: Dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.unfollow, usersActions.unfollowSuccess)
}

const followUnfollowFlow = async (dispatch: Dispatch, userId: number, apiMethod: (userId: number) => any, AC: (payload: { userId: number }) => any) => {
    dispatch(usersActions.toggleFollowingProgress({isFetching: true, userId}))
    const response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(AC({userId}))
    }
    dispatch(usersActions.toggleFollowingProgress({isFetching: false, userId}))
}


export const usersReducer = slice.reducer
export const usersActions = slice.actions
export const usersThunks = {requestUsers}