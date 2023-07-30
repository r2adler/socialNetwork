export const x = 9
// import profileReducer, {addPost, updateNewPostText} from './profile-reducer';
// import dialogsReducer, {sendMessageAC, updateNewMessageBodyCreator} from './dialogs-reducer';
// import sidebarReducer from './sidebar-reducer';
//
//
// type dialogsType = {
//     id: number
//     name: string
// }
// type messagesType = {
//     id: number
//     message: string
// }
// type PostsType = {
//     id: number
//     message: string
//     likesCount: number
// }
// export type ProfilePageType = {
//     posts: Array<PostsType>
//     newPostText: string
// }
// export type DialogsPageType = {
//     dialogs: Array<dialogsType>
//     messages: Array<messagesType>
//     newMessageBody: string
// }
// export type RootStateType = {
//     profilePage: ProfilePageType
//    dialogsPage: DialogsPageType
//     sidebar: any
// }
// export type StoreType = {
//     _state: RootStateType
//     getState: () => RootStateType
//     _callSubscriber: (state: RootStateType) => void
//     dispatch: (action: ActionsType) => void
//     subscribe: (observer: any) => void
// }
// export type ActionsType = ReturnType<typeof addPost> | ReturnType<typeof updateNewPostText> | ReturnType<typeof sendMessageAC> | ReturnType<typeof updateNewMessageBodyCreator>
//
//
// let store: StoreType = {
//     _state: {
//         profilePage: {
//             posts: [
//                 {id: 1, message: 'Hi, how are you ?', likesCount: 2},
//                 {id: 2, message: 'whatsup ', likesCount: 14},
//                 {id: 3, message: 'Hi', likesCount: 22},
//             ],
//             newPostText: 'it-ka'
//         },
//         dialogsPage: {
//             dialogs: [
//                 {id: 1, name: 'Dimich'},
//                 {id: 2, name: 'Svetich'},
//                 {id: 3, name: 'Petrovich'},
//             ],
//             messages: [
//                 {id: 1, message: 'sdfsd dfgdfg dfgdfg'},
//                 {id: 2, message: 'sfdd d dfdgd gfd'},
//                 {id: 3, message: 'sdf232sd'},
//             ],
//             newMessageBody: ''
//         },
//         sidebar: {}
//     },
//     _callSubscriber() {
//         console.log('State changed')
//     },
//     getState() {
//         return this._state
//     },
//     subscribe(observer: any) {
//         this._callSubscriber = observer
//     },
//     dispatch(action: any) {
//         this._state.profilePage = profileReducer(this._state.profilePage, action)
//         this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
//         this._state.sidebar = sidebarReducer(this._state.sidebar, action)
//
//         this._callSubscriber(this._state)
//     }
// }
//
//
// export default store