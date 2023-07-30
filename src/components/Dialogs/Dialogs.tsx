import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import React, {ChangeEvent, FC} from 'react'
import {
    InitialStateType,
    sendMessageAC,
    updateNewMessageBodyCreator
} from '../../redux/dialogs-reducer';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {Navigate} from 'react-router-dom';


const Dialogs: FC = () => {
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector<boolean>((state) => state.auth.isAuth)
    const {messages, newMessageBody, dialogs} = useAppSelector<InitialStateType>(state => state.dialogsPage);


    const dialogsElements = dialogs.map(obj => <DialogItem name={obj.name} id={obj.id} key={obj.id}/>)
    const messageElements = messages.map(obj => <Message message={obj.message} key={obj.id}/>)

    const onSendMessageClick = () => {
        dispatch(sendMessageAC())
    }

    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const body = e.target.value
        dispatch(updateNewMessageBodyCreator(body))
    }

    if (!isAuth) {
        return <Navigate to={'/login'}/>
    }


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messageElements}</div>
                <div>
                    <div>
                        <textarea
                            value={newMessageBody}
                            placeholder={'Enter your message'}
                            onChange={onNewMessageChange}
                        >
                        </textarea>
                    </div>
                    <div>
                        <button onClick={onSendMessageClick}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs