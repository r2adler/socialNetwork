import React, {ChangeEvent} from 'react';
import Post from './Post/Post';
import {FC} from 'react';
import {addPostAC, InitialStateType, updateNewPostTextAC} from '../../../redux/profile-reducer';
import {useAppDispatch, useAppSelector} from '../../../redux/store';




export const MyPosts: FC = () => {
    const dispatch = useAppDispatch()
    const {posts, newPostText} = useAppSelector<InitialStateType>(state => state.profilePage)

    let onAddPost = () => {
        dispatch(addPostAC())
    }

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(updateNewPostTextAC(e.currentTarget.value))
    }


    return (
        <div>
            <div style={{padding: '10px'}}>
                <h3>My posts</h3>
                <div>
                    <div>
                        <textarea
                            onChange={onPostChange}
                            value={newPostText}
                        />
                    </div>
                    <div>
                        <button onClick={onAddPost}>Add post</button>
                    </div>
                </div>
            </div>
            <div className={'posts'}>
                {
                    posts.map(obj => <Post message={obj.message} likesCount={obj.likesCount} key={obj.id}/>)
                }
            </div>
        </div>
    )
}


