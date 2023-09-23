import React, {FC, memo} from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType} from 'redux/store';
import {Paginator} from 'components/common/Paginator/Paginator';
import {User} from 'components/Users/User/user';
import {UserType} from 'api/usersAPI';
import {UsersSearchForm} from 'components/Users/users_search/UesersSearchForm';


const Users: FC = memo(() => {
    const users = useSelector<AppRootStateType, UserType[]>(state => state.usersPage.users);

    return (
        <div>
            <UsersSearchForm/>
            <Paginator/>
            <div>
                {
                    users.map(user => <User key={Math.random()} user={user}/>)
                }
            </div>
        </div>
    )
})
export default Users


