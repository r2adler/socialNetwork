import React, {ChangeEvent} from 'react';
import Post from './Post/Post';
import {FC} from 'react';
import {PostsType} from '../../../redux/profile-reducer';


interface MyPostsProps {
    posts: PostsType[]
    newPostText: string
    updateNewPost: (text: string) => void
    addPost: () => void
}


const MyPosts: FC<MyPostsProps> = (props) => {
    let onAddPost = () => {
        props.addPost()
    }

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewPost(e.currentTarget.value)
    }

    return (
        <div>
            <div style={{padding: '10px'}}>
                <h3>My posts</h3>
                <div>
                    <div>
                        <textarea
                            onChange={onPostChange}
                            value={props.newPostText}
                        />
                    </div>
                    <div>
                        <button onClick={onAddPost}>Add post</button>
                    </div>
                </div>
            </div>
            <div className={'posts'}>
                {
                    props.posts.map(obj => <Post message={obj.message} likesCount={obj.likesCount} key={obj.id}/>)
                }
            </div>
        </div>
    )
}

export default MyPosts