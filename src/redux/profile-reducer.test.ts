import {profileActions, ProfileInitialStateType, profileReducer} from 'redux/profile-reducer';


let startState: ProfileInitialStateType

beforeEach(() => {
    startState = {
        posts: [
            {id: 1, message: 'Hi, how are you ?', likesCount: 2},
            {id: 2, message: 'whatsup ', likesCount: 14},
            {id: 3, message: 'Hi', likesCount: 22},
        ],
        profile: null,
        status: ''
    }
})
test('a new post should be added', () => {
    const endState = profileReducer(startState, profileActions.addPost({newPostText: 'new'}))
    expect(endState.posts.length).toBe(4)
    expect(endState.posts[3].message).toBe('new')
})
test('the correct post should be deleted', () => {
    const endState = profileReducer(startState, profileActions.deletePost({postId: 3}))
    const endState2 = profileReducer(startState, profileActions.deletePost({postId: 1233}))
    expect(endState.posts.length).toBe(2)
    expect(endState2.posts.length).toBe(3)
})