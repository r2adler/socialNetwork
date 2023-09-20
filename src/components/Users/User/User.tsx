import React, {FC} from 'react';
import userPhoto from 'assets/images/user.png';
import {usersThunks} from 'redux/users-reducer';
import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from 'redux/store';
import styles from './User.module.css'
import {UserType} from 'api/usersAPI';


export const User: FC<UserPropsType> = ({user}) => {
    const dispatch = useAppDispatch()
    const followingInProgress = useSelector<AppRootStateType, number[]>(state => state.usersPage.followingInProgress)

    return (
        <div key={user.id}>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img
                            src={user.photos.small ? user.photos.small : userPhoto}
                            className={styles.userPhoto}
                            alt="img"
                        />
                    </NavLink>
                </div>
                <div>
                    {user.followed ?
                        <button
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => dispatch(usersThunks.unfollow({userId: user.id}))}
                        >
                            Unfollow
                        </button>
                        :
                        <button
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => dispatch(usersThunks.follow({userId: user.id}))}
                        >
                            Follow
                        </button>
                    }
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{'u.location.country'}</div>
                    <div>{'u.location.city'}</div>
                </span>
            </span>
        </div>)
};

type UserPropsType = {
    user: UserType
}

