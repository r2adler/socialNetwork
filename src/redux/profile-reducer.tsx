import {AppThunk} from './store';
import {Dispatch} from 'redux';
import {profileAPI, usersAPI} from 'api/api';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'profile',
    initialState: {
        posts: [
            {id: 1, message: 'Hi, how are you ?', likesCount: 2},
            {id: 2, message: 'whatsup ', likesCount: 14},
            {id: 3, message: 'Hi', likesCount: 22},
        ],
        profile: null,
        status: ''
    } as ProfileInitialStateType,
    reducers: {
        addPost: (state, action: PayloadAction<{ newPostText: string }>) => {
            const newPost: PostsType = {
                id: 5,
                message: action.payload.newPostText,
                likesCount: 0
            }
            state.posts.push(newPost)
        },
        setUserProfile: (state, action: PayloadAction<{ profile: ProfileType | null }>) => {
            state.profile = action.payload.profile
        },
        setUserStatus: (state, action: PayloadAction<{ status: string }>) => {
            state.status = action.payload.status
        },
        deletePost: (state, action: PayloadAction<{ postId: number }>) => {
            const index = state.posts.findIndex(p => p.id === action.payload.postId)
            if (index !== -1) {
                state.posts.splice(index, 1)
            }
        },
        savePhoto: (state, action: PayloadAction<photosItem>) => {
            state.profile!.photos =  action.payload
        }
    }
})


// thunks
export const getUserProfile = (userId: number): AppThunk => (dispatch: Dispatch<any>) => {
    usersAPI.getProfile(userId)
        .then(response => {
            dispatch(profileActions.setUserProfile({profile: response.data}))
        })
}
export const getUserStatus = (userId: number): AppThunk => (dispatch: Dispatch) => {
    profileAPI.getStatus(userId)
        .then(response => {
            dispatch(profileActions.setUserStatus({status: response.data}))
        })
}
export const updateUserStatus = (status: string): AppThunk => (dispatch: Dispatch) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(profileActions.setUserStatus({status}))
            }
        })
}
export const savePhoto = (file: File): AppThunk => async (dispatch: Dispatch) => {
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(profileActions.savePhoto(response.data.data.photos))
    }
}


export const profileReducer = slice.reducer
export const profileActions = slice.actions
export const profileThunks = {savePhoto, updateUserStatus, getUserProfile, getUserStatus}


// types
export type PostsType = {
    id: number
    message: string
    likesCount: number
}
export type photosItem = {
    small: string;
    large: string;
}
export type contactsItem = {
    youtube: any;
    website: any;
    twitter: string;
    github: string;
    vk: string;
    facebook: string;
    mainLink: any;
    instagram: string;
}
export type ProfileType = {
    lookingForAJobDescription: string;
    lookingForAJob: boolean;
    fullName: string;
    userId: number;
    photos: photosItem;
    contacts: contactsItem;
    aboutMe: string;
}
export type ProfileInitialStateType = {
    posts: Array<PostsType>
    profile: ProfileType | null
    status: string
}

