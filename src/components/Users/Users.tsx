import React, {useEffect} from 'react';
import userPhoto from '../../assets/images/user.png';
import styles from './users.module.css';
import {useSelector} from 'react-redux';
import {
    followTC,
    getUsersTC, onPageChangeTC,
    unfollowTC,
    UserType
} from '../../redux/users-reducer';
import {AppRootStateType, useAppDispatch} from '../../redux/store';
import {NavLink} from 'react-router-dom';



export const Users = () => {
    const dispatch = useAppDispatch()
    const users = useSelector<AppRootStateType, UserType[]>(state => state.usersPage.users);
    const pageSize = useSelector<AppRootStateType, number>(state => state.usersPage.pageSize);
    const currentPage = useSelector<AppRootStateType, number>(state => state.usersPage.currentPage)
    const totalUsersCount = useSelector<AppRootStateType, number>(state => state.usersPage.totalUsersCount)
    const followingInProgress = useSelector<AppRootStateType, number[]>(state => state.usersPage.followingInProgress)


    useEffect(() => {
        dispatch(getUsersTC(currentPage, pageSize))
    }, []);

    const onPageChanged = (pageNumber: number) => {
        dispatch(onPageChangeTC(pageNumber, pageSize))
    }

    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i += 1) {
        pages.push(i)
    }

    return (
        <div>
            <div>
                {
                    pages.map(p => (
                        <span
                            key={p}
                            className={currentPage === p ? styles.selectedPage : ''}
                            onClick={() => onPageChanged(p)}
                        >
                                {p}
                            </span>))
                }
            </div>
            {
                users.map(u => (
                    <div key={u.id}>
                        <span>
                            <div>
                                <NavLink to={'/profile/' + u.id}>
                                     <img src={u.photos.small ? u.photos.small : userPhoto} className={styles.userPhoto}
                                          alt="img"/>
                                </NavLink>
                            </div>
                              <div>
                                  {u.followed ?
                                      <button
                                          disabled={followingInProgress.some(id => id === u.id)}
                                          onClick={() => dispatch(unfollowTC(u.id))}
                                      >
                                          Unfollow
                                      </button> :
                                      <button
                                          disabled={followingInProgress.some(id => id === u.id)}
                                          onClick={() => dispatch(followTC(u.id))}
                                      >
                                          Follow
                                      </button>
                                  }
                            </div>
                        </span>
                        <span>
                            <span>
                                <div>{u.name}</div>
                                <div>{u.status}</div>
                            </span>
                            <span>
                                <div>{'u.location.country'}</div>
                                <div>{'u.location.city'}</div>
                            </span>
                        </span>
                    </div>
                ))
            }
        </div>
    );
};



