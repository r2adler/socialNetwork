import {usersActions, usersReducer, UsersStateType} from 'redux/users_reducer/users-reducer';

let startState: UsersStateType

beforeEach(() => {
    startState = {
        users: [
            {
                name: 'Art',
                id: 1,
                uniqueUrlName: 'asd',
                photos: {
                    small: 'sdfsdf',
                    large: 'sddsfs'
                },
                status: 'i am',
                followed: false
            },
            {
                name: 'Dim',
                id: 2,
                uniqueUrlName: 'qwe',
                photos: {
                    small: 'sdf2sdf',
                    large: 'sdd34s'
                },
                status: 'he is',
                followed: true
            }
        ],
        pageSize: 5,
        totalItemsCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [1, 3],
    }
})
test('follow success', () => {
    const endState = usersReducer(startState, usersActions.followSuccess({userId: 1}))
    expect(endState.users[0].followed).toBe(true)
})
test('unfollow success', () => {
    const endState = usersReducer(startState, usersActions.unfollowSuccess({userId: 2}))
    expect(endState.users[1].followed).toBe(false)
})