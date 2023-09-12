import {profileAPI} from 'api/api';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createAppAsyncThunk} from 'utils/createAppAsyncThunk';

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
        deletePost: (state, action: PayloadAction<{ postId: number }>) => {
            const index = state.posts.findIndex(p => p.id === action.payload.postId)
            if (index !== -1) {
                state.posts.splice(index, 1)
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.profile = action.payload.profile
            })
            .addCase(getUserStatus.fulfilled, (state, action) => {
                state.status = action.payload.status
            })
            .addCase(updateUserStatus.fulfilled, (state, action) => {
                state.status = action.payload.status
            })
            .addCase(savePhoto.fulfilled, (state, action) => {
                state.profile!.photos = action.payload
            })
    }
})


// thunks
const getUserProfile = createAppAsyncThunk<{ profile: ProfileType }, number>(
    'profilePage/getUserProfile',
    async (userId) => {
        const res = await profileAPI.getProfile(userId)
        return {profile: res.data}
    })

const getUserStatus = createAppAsyncThunk<{ status: string }, number>(
    'profilePage/getUserStatus',
    async (userId) => {
        const res = await profileAPI.getStatus(userId)
        return {status: res.data}
    })
const updateUserStatus = createAppAsyncThunk<{ status: string }, string>(
    'profilePage/updateUserStatus',
    async (status, thunkAPI) => {
        const {rejectWithValue} = thunkAPI
        const res = await profileAPI.updateStatus(status)
        if (res.data.resultCode === 0) {
            return {status}
        } else {
            return rejectWithValue(null)
        }
    })

export const savePhoto = createAppAsyncThunk<photosItem, File>(
    'profilePage/savePhoto',
    async (file, thunkAPI) => {
        const {rejectWithValue} = thunkAPI
        const res = await profileAPI.savePhoto(file)
        if (res.data.resultCode === 0) {
            console.log(res.data.data.photos)
            return res.data.data.photos
        } else {
            return rejectWithValue(null)
        }
    })

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

