import React from 'react';
import Post from './Post/Post';
import {FC} from 'react';
import {addPostAC, PostsType} from '../../../redux/profile-reducer';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {useFormik} from 'formik';





export const MyPosts: FC = () => {
    const posts = useAppSelector<Array<PostsType>>(state => state.profilePage.posts)

    return (
        <div>
            <div style={{padding: '10px'}}>
                <h3>My posts</h3>
                <MyPostsForm/>
            </div>
            <div className={'posts'}>
                {
                    posts.map(obj => <Post message={obj.message} likesCount={obj.likesCount} key={obj.id}/>)
                }
            </div>
        </div>
    )
}


export const MyPostsForm = () => {
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            newPostText: '',
        },
        onSubmit: values => {
            formik.resetForm()
            dispatch(addPostAC(values.newPostText))
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <input type="textarea" placeholder={'enter your message'} {...formik.getFieldProps('newPostText')}/>
            </div>
            <div>
                <button type={'submit'}>Add post</button>
            </div>
        </form>
    )
}

