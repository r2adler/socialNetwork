import {usersAPI} from '../api/api';
import {Dispatch} from 'redux';
import {AppThunk} from './store';

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
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}
export type setCurrentPageType = ReturnType<typeof setCurrentPage>
export type setUsersType = ReturnType<typeof setUsers>
export type unfollowType = ReturnType<typeof unfollowSuccessAC>
export type followType = ReturnType<typeof followSuccessAC>
export type setTotalUsersCountType = ReturnType<typeof setTotalUsersCount>
export type setIsFetchingType = ReturnType<typeof setIsFetching>
export type toggleFollowingProgressType = ReturnType<typeof toggleFollowingProgress>
export type UserActionsType = followType
    | unfollowType
    | setUsersType
    | setCurrentPageType
    | setTotalUsersCountType
    | setIsFetchingType
    | toggleFollowingProgressType


const initialState: InitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
}

const usersReducer = (state: InitialStateType = initialState, action: UserActionsType): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)
            }
        case 'SET_USERS':
            return {...state, users: [...action.users, ...state.users,]}
        case 'SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage}
        case 'SET_TOTAL_USERS_COUNT':
            return {...state, totalUsersCount: action.totalCount}
        case 'TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}


export const followSuccessAC = (userId: number) => {
    return {type: 'FOLLOW', userId} as const
}
export const unfollowSuccessAC = (userId: number) => {
    return {type: 'UNFOLLOW', userId} as const
}
export const setUsers = (users: UserType[]) => {
    return {type: 'SET_USERS', users} as const
}
export const setCurrentPage = (currentPage: number) => {
    return {type: 'SET_CURRENT_PAGE', currentPage} as const
}
export const setTotalUsersCount = (totalCount: number) => {
    return {type: 'SET_TOTAL_USERS_COUNT', totalCount} as const
}
export const setIsFetching = (isFetching: boolean) => {
    return {type: 'TOGGLE_IS_FETCHING', isFetching} as const
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number) => {
    return {type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const
}


//thunks
export const getUsersTC = (currentPage: number, pageSize: number): AppThunk => (dispatch: Dispatch<UserActionsType>) => {
    dispatch(setIsFetching(true))

    usersAPI.getUsers(currentPage, pageSize)
        .then(data => {
            dispatch(setIsFetching(false))
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
        })
}

export const onPageChangeTC = (pageNumber: number, pageSize: number): AppThunk => (dispatch: Dispatch<UserActionsType>) => {
    dispatch(setCurrentPage(pageNumber))
    dispatch(setIsFetching(true))

    usersAPI.getUsers(pageNumber, pageSize)
        .then(data => {
            dispatch(setUsers(data.items))
            dispatch(setIsFetching(false))
        })
}


export const followTC = (userId: number): AppThunk => (dispatch: Dispatch<UserActionsType>) => {
    dispatch(toggleFollowingProgress(true, userId))
    usersAPI.follow(userId)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(followSuccessAC(userId))
            }
            dispatch(toggleFollowingProgress(false, userId))
        })
}

export const unfollowTC = (userId: number): AppThunk => (dispatch: Dispatch<UserActionsType>) => {
    dispatch(toggleFollowingProgress(true, userId))
    usersAPI.unfollow(userId)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(unfollowSuccessAC(userId))
            }
            dispatch(toggleFollowingProgress(false, userId))
        })
}

export default usersReducer;