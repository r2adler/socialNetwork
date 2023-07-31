import {AppThunk} from './store';
import {Dispatch} from 'redux';
import {profileAPI, usersAPI} from '../api/api';

export type PostsType = {
    id: number
    message: string
    likesCount: number
}
export type setUserProfileType = ReturnType<typeof setUserProfileAC>
export type addPost = ReturnType<typeof addPostAC>
export type updateNewPostText = ReturnType<typeof updateNewPostTextAC>
export type  ProfileActionsType = addPost
    | updateNewPostText
    | setUserProfileType
    | ReturnType<typeof setUserStatusAC>

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

export type InitialStateType = typeof initialState

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you ?', likesCount: 2},
        {id: 2, message: 'whatsup ', likesCount: 14},
        {id: 3, message: 'Hi', likesCount: 22},
    ] as Array<PostsType>,
    newPostText: 'it-ka',
    profile: null as ProfileType | null,
    status: ''
}


const profileReducer = (state: InitialStateType = initialState, action: ProfileActionsType): InitialStateType => {
    switch (action.type) {
        case 'ADD-POST':
            let newPost: PostsType = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        case 'UPDATE-NEW-POST-TEXT':
            return {
                ...state,
                newPostText: action.newText
            }
        case 'SET_USERS_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'SET_USER_STATUS':
            return {
                ...state,
                status: action.status
            }
        default:
            return state
    }
}


export const addPostAC = () => {
    return {type: 'ADD-POST'} as const
}
export const updateNewPostTextAC = (newText: string) => {
    return {type: 'UPDATE-NEW-POST-TEXT', newText} as const
}
export const setUserProfileAC = (profile: ProfileType | null) => {
    return {type: 'SET_USERS_PROFILE', profile} as const
}
export const setUserStatusAC = (status: string) => {
    return {type: 'SET_USER_STATUS', status} as const
}


export const getUserProfileTC = (userId: number): AppThunk => (dispatch: Dispatch<setUserProfileType>) => {
    usersAPI.getProfile(userId)
        .then(response => {
            dispatch(setUserProfileAC(response.data))
        })
}
export const getUserStatusTC = (userId: number): AppThunk => (dispatch: Dispatch) => {
    profileAPI.getStatus(userId)
        .then(response => {
            dispatch(setUserStatusAC(response.data))
        })
}
export const updateUserStatusTC = (status: string): AppThunk => (dispatch: Dispatch) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setUserStatusAC(status))
            }
        })
}


export default profileReducer