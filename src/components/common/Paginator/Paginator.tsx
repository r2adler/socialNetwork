import styles from './Paginator.module.css'
import { useAppDispatch, useAppSelector} from 'redux/store';
import {usersThunks} from 'redux/users_reducer/users-reducer';
import {FC, memo, useEffect, useState} from 'react';
import {getCurrentPage, getFilter, getPageSize, getTotalItemsCount} from 'redux/users_reducer/users_selectors';


export const Paginator: FC = memo(() => {
    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state)
    const currentPage = getCurrentPage(state)
    const totalItemsCount = getTotalItemsCount(state)
    const pageSize = getPageSize(state)
    const filter = getFilter(state)
    const portionSize = 10

    useEffect(() => {
        dispatch(usersThunks.getUsers({page: currentPage, pageSize, filter}))
    }, []);

    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i += 1) {
        pages.push(i)
    }

    const onPageChanged = (page: number) => {
        dispatch(usersThunks.getUsers({page, pageSize, filter}))
    }
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
    )
})