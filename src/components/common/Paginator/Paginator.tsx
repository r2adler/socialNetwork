import styles from './Paginator.module.css'
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from 'redux/store';
import {usersThunks} from 'redux/users-reducer';
import {useEffect, useState} from 'react';


export const Paginator = () => {
    const dispatch = useAppDispatch()
    const currentPage = useSelector<AppRootStateType, number>(state => state.usersPage.currentPage)
    const totalItemsCount = useSelector<AppRootStateType, number>(state => state.usersPage.totalItemsCount)
    const pageSize = useSelector<AppRootStateType, number>(state => state.usersPage.pageSize);
    const portionSize = 10

    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i += 1) {
        pages.push(i)
    }

    const onPageChanged = (pageNumber: number) => {
        dispatch(usersThunks.onPageChange({pageNumber, pageSize}))
    }

    useEffect(() => {
        dispatch(usersThunks.requestUsers({page: currentPage, pageSize}))
    }, []);

    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState<number>(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    return (
        <div>
            {
                portionNumber > 1 &&
                <button onClick={() => setPortionNumber(portionNumber - 1)}>PREV</button>
            }
            {
                pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map(p => (
                        <span
                            key={p}
                            className={currentPage === p ? styles.pages + ' ' + styles.selectedPage : styles.pages}
                            onClick={() => onPageChanged(p)}
                        >
                    {p}
                    </span>))
            }
            {
                portionCount > portionNumber &&
                <button onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>
            }
        </div>
    );
};