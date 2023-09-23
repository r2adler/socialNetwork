import {useAppDispatch, useAppSelector} from 'redux/store';
import {useFormik} from 'formik';
import {FilterType, usersThunks} from 'redux/users_reducer/users-reducer';

export const useUsersSearch = () => {
    const dispatch = useAppDispatch()
    const pageSize = useAppSelector((state) => state.usersPage.pageSize)
    const onFilterChanged = (filter: FilterType) => {
        dispatch(usersThunks.getUsers({page: 1, pageSize, filter}))
    }

    const formik = useFormik({
        initialValues: {
            term: '',
            friend: 'null'
        },
        onSubmit: (values: FormType, {setSubmitting}: any) => {
            const filter2 = {
                term: values.term, friend: values.friend === 'true' ? true
                    : values.friend === 'false' ? false : null
            }
            onFilterChanged(filter2)
            setSubmitting(false)
        },
    })
    return {formik}
}

type FormType = {
    term: string
    friend: 'true' | 'false' | 'null'
}