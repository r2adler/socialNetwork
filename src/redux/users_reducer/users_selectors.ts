import {FilterType} from 'redux/users_reducer/users-reducer';
import {AppRootStateType} from 'redux/store';
import {UserType} from 'api/usersAPI';

export const getUsers = (state: AppRootStateType): UserType[] => state.usersPage.users
export const getPageSize = (state: AppRootStateType): number => state.usersPage.pageSize
export const getTotalItemsCount = (state: AppRootStateType): number => state.usersPage.totalItemsCount
export const getCurrentPage = (state: AppRootStateType): number => state.usersPage.currentPage
export const getIsFetching = (state: AppRootStateType): boolean => state.usersPage.isFetching
export const getFollowingInProgress = (state: AppRootStateType): number[] => state.usersPage.followingInProgress
export const getFilter = (state: AppRootStateType): FilterType => state.usersPage.filter