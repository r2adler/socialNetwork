import React from 'react';
import Post from './Post/Post';
import {FC} from 'react';
import {useAppDispatch, useAppSelector} from 'redux/store';
import {useFormik} from 'formik';
import {addPostAC, PostsType} from 'redux/profile-reducer';





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

type FormikErrorType = {
    newPostText?: string
}
export const MyPostsForm = () => {
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            newPostText: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.newPostText) {
                errors.newPostText = 'Required'
            } else if (values.newPostText.length > 10) {
                errors.newPostText = 'The post should be less than 10 symbols'
            }
            return errors
        },
        onSubmit: values => {
            formik.resetForm()
            dispatch(addPostAC(values.newPostText))
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <textarea placeholder={'enter your message'} {...formik.getFieldProps('newPostText')}/>
                {formik.errors.newPostText && formik.touched.newPostText ?
                    <div style={{color: 'red'}}>{formik.errors.newPostText}</div> : null}
            </div>
            <div>
                <button type={'submit'}>Add post</button>
            </div>
        </form>
    )
}

