import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import {ChangeEvent, FC} from 'react'
import {
    DialogType,
    MessageType,
    sendMessageAC,
    updateNewMessageBodyCreator
} from '../../redux/dialogs-reducer';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/store';


const Dialogs: FC = () => {
    const dialogs = useSelector<AppRootStateType, Array<DialogType>>(state => state.dialogsPage.dialogs);
    const messages = useSelector<AppRootStateType, Array<MessageType>>(state => state.dialogsPage.messages);
    const newMessageBody = useSelector<AppRootStateType, string>(state => state.dialogsPage.newMessageBody);

    const dialogsElements = dialogs.map(obj => <DialogItem name={obj.name} id={obj.id} key={obj.id}/>)
    const messageElements = messages.map(obj => <Message message={obj.message} key={obj.id}/>)

    const onSendMessageClick = () => {
        sendMessageAC()
    }

    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const body = e.target.value
        updateNewMessageBodyCreator(body)
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