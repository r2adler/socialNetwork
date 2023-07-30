export type DialogType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}
export type DialogsActionsType = ReturnType<typeof sendMessageAC> | ReturnType<typeof updateNewMessageBodyCreator>


let initialState = {
    dialogs: [
        {id: 1, name: 'Dimich'},
        {id: 2, name: 'Winston Churchill'},
        {id: 3, name: 'Michael Jordan'},
        {id: 4, name: 'Joe Rogan'},
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'yo yo yo'},
        {id: 2, message: 'Success is the ability to move from failure to failure without losing your enthusiasm.'},
        {
            id: 3,
            message: 'In my career, I missed over 9,000 shots and lost almost 300 games. Twenty-six times I was trusted to make the final winning shot, and I missed. I lost again and again and again. And that\'s why I succeeded.'
        },
        {id: 4, message: 'Hello freak bitches'},
    ] as Array<MessageType>,
    newMessageBody: '' as string
}


export type InitialStateType = typeof initialState


const dialogsReducer = (state: InitialStateType = initialState, action: DialogsActionsType): InitialStateType => {
    switch (action.type) {
        case 'UPDATE-NEW-MESSAGE-BODY':
            return {...state, newMessageBody: action.body}
        case 'SEND-MESSAGE':
            const body = state.newMessageBody
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, {id: 6, message: body}]
            }
        default:
            return state
    }
}


export const sendMessageAC = () => {
    return {type: 'SEND-MESSAGE'} as const
}
export const updateNewMessageBodyCreator = (body: string) => {
    return {type: 'UPDATE-NEW-MESSAGE-BODY', body} as const
}


export default dialogsReducer