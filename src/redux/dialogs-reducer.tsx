export type DialogType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}
export type DialogsActionsType = ReturnType<typeof sendMessageAC>


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
}


export type InitialStateType = typeof initialState


const dialogsReducer = (state: InitialStateType = initialState, action: DialogsActionsType): InitialStateType => {
    switch (action.type) {
        case 'SEND-MESSAGE':
            const body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            }
        default:
            return state
    }
}


export const sendMessageAC = (newMessageBody: string) => {
    return {type: 'SEND-MESSAGE', newMessageBody} as const
}


export default dialogsReducer