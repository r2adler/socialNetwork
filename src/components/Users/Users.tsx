import React from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType} from 'redux/store';
import {Paginator} from 'components/common/Paginator/Paginator';
import {User} from 'components/Users/User/User';
import {UserType} from 'api/usersAPI';


const Users = () => {
    const users = useSelector<AppRootStateType, UserType[]>(state => state.usersPage.users);

    return (
        <div>
            <Paginator/>
            <div>
                {
                    users.map(user => <User key={user.id} user={user}/>)
                }
            </div>
        </div>
    );
};
export default Users


