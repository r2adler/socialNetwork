import {createSlice, PayloadAction} from '@reduxjs/toolkit';


const slice = createSlice({
    name: 'dialogs',
    initialState: {
        dialogs: [
            {id: 1, name: 'Dimich'},
            {id: 2, name: 'Winston Churchill'},
            {id: 3, name: 'Michael Jordan'},
            {id: 4, name: 'Joe Rogan'},
        ] ,
        messages: [
            {id: 1, message: 'yo yo yo'},
            {id: 2, message: 'Success is the ability to move from failure to failure without losing your enthusiasm.'},
            {
                id: 3,
                message: 'In my career, I missed over 9,000 shots and lost almost 300 games. Twenty-six times I was trusted to make the final winning shot, and I missed. I lost again and again and again. And that\'s why I succeeded.'
            },
            {id: 4, message: 'Hello freak bitches'},
        ]
    } as DialogsInitialStateType,
    reducers: {
        sendMessage: (state, action: PayloadAction<{ newMessageBody: string }>) => {
            state.messages.push({id: 6, message: action.payload.newMessageBody})
        }
    }
})


export const dialogsReducer = slice.reducer
export const dialogsActions = slice.actions



// types
export type DialogType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}
export type DialogsInitialStateType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}
