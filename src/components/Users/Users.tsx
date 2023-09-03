import React from 'react';
import {useSelector} from 'react-redux';
import {UserType} from 'redux/users-reducer';
import {AppRootStateType} from 'redux/store';
import {Paginator} from 'components/common/Paginator/Paginator';
import {User} from 'components/Users/User/User';


const Users = () => {
    const users = useSelector<AppRootStateType, UserType[]>(state => state.usersPage.users);

    return (
        <div>
            <Paginator/>
            <div>
                {
                    users.map(user => <User user={user}/>)
                }
            </div>
        </div>
    );
};
export default Users


