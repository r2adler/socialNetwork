import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {FC} from 'react';
import {MyPosts} from './MyPosts/MyPosts';
import {useAppSelector} from '../../redux/store';
import {Navigate} from 'react-router-dom';


const Profile: FC = () => {
    const isAuth = useAppSelector<boolean>((state) => state.auth.isAuth)

    if (!isAuth) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div>
            <ProfileInfo/>
            <MyPosts/>
        </div>
    )
}

export default Profile