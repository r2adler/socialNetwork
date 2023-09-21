import {usersAPI} from 'api/usersAPI';
import {ResponseType, ResultCode} from 'api/api';
import {usersActions, usersThunks} from 'redux/users_reducer/users-reducer';

jest.mock('api/usersAPI')
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
let dispatchMock = jest.fn()
let getStateMock = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
})
const response: ResponseType = {
    resultCode: ResultCode.Success,
    data: {},
    fieldsErrors: [],
    messages: []
}

test('success follow thunc', async () => {
    const thunk = usersThunks.follow({userId: 1})

    userAPIMock.follow.mockReturnValue(Promise.resolve(response))

    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(5)

    expect(dispatchMock).toHaveBeenCalledWith(usersActions.toggleFollowingProgress({isFetching: true, userId: 1}))
    expect(dispatchMock).toHaveBeenCalledWith(usersActions.followSuccess({userId: 1}))
    expect(dispatchMock).toHaveBeenCalledWith(usersActions.toggleFollowingProgress({isFetching: false, userId: 1}))
})

test('success unfollow thunc', async () => {
    const thunk = usersThunks.unfollow({userId: 1})

    userAPIMock.unfollow.mockReturnValue(Promise.resolve(response))

    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(5)
    expect(dispatchMock).toHaveBeenCalledWith(usersActions.toggleFollowingProgress({isFetching: true, userId: 1}))
    expect(dispatchMock).toHaveBeenCalledWith(usersActions.unfollowSuccess({userId: 1}))
    expect(dispatchMock).toHaveBeenCalledWith(usersActions.toggleFollowingProgress({isFetching: false, userId: 1}))
})