import React from 'react';
import {addPost, PostsType, updateNewPostText} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../../redux/store';
import {Dispatch} from 'redux';


type MapStatePropsType = {
    posts: PostsType[]
    newPostText: string
}
type MapDispatchPropsType = {
    updateNewPost: (text: string) => void
    addPost: () => void
}


const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        updateNewPost: (text: string) => {
            let action = updateNewPostText(text)
            dispatch(action)
        },
        addPost: () => {
            dispatch(addPost())
        }
    }
}


const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer