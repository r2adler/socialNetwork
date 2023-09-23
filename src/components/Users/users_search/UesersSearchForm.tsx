import {FC} from 'react';
import {useUsersSearch} from 'components/Users/users_search/useUsersSearch';

export const UsersSearchForm: FC = () => {
    const {formik} = useUsersSearch()

    return (
        <form onSubmit={formik.handleSubmit}>
            <input type="text" placeholder={'name'} {...formik.getFieldProps('term')}/>
            <select  {...formik.getFieldProps('friend')}>
                <option value="null">All</option>
                <option value="true">Only followed</option>
                <option value="false">Only unfollowed</option>
            </select>
            <button type={'submit'}>Find</button>
        </form>
    )
}
