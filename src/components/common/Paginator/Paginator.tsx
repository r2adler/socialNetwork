import styles from './Paginator.module.css'
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from 'redux/store';
import {onPageChangeTC, requestUsersTC} from 'redux/users-reducer';
import {useEffect} from 'react';


export const Paginator = () => {
    const dispatch = useAppDispatch()
    const currentPage = useSelector<AppRootStateType, number>(state => state.usersPage.currentPage)
    const totalUsersCount = useSelector<AppRootStateType, number>(state => state.usersPage.totalUsersCount)
    const pageSize = useSelector<AppRootStateType, number>(state => state.usersPage.pageSize);

    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i += 1) {
        pages.push(i)
    }

    const onPageChanged = (pageNumber: number) => {
        dispatch(onPageChangeTC(pageNumber, pageSize))
    }

    useEffect(() => {
        dispatch(requestUsersTC(currentPage, pageSize))
    }, []);

    return (
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
    );
};