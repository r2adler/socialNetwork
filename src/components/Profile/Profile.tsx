import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {FC} from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';


const Profile: FC = () => {

    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile