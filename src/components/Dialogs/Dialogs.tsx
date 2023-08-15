import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import React, {FC} from 'react'
import {
    DialogType,
    MessageType,
    sendMessageAC,
} from '../../redux/dialogs-reducer';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {Navigate} from 'react-router-dom';
import {useFormik} from 'formik';


const Dialogs: FC = () => {
    const isAuth = useAppSelector<boolean>((state) => state.auth.isAuth)
    const messages = useAppSelector<Array<MessageType>>(state => state.dialogsPage.messages);
    const  dialogs = useAppSelector<Array<DialogType>>(state => state.dialogsPage.dialogs);

    const dialogsElements = dialogs.map(obj => <DialogItem name={obj.name} id={obj.id} key={obj.id}/>)
    const messageElements = messages.map(obj => <Message message={obj.message} key={obj.id}/>)

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
                <AddMessageForm/>
            </div>
        </div>
    )
}

export default Dialogs


export const AddMessageForm = () => {
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            newMessageBody: '',
        },
        onSubmit: values => {
            formik.resetForm()
            dispatch(sendMessageAC(values.newMessageBody))
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <input type="text" placeholder={'enter your message'} {...formik.getFieldProps('newMessageBody')}/>
            </div>
            <div>
                <button type={'submit'}>Send</button>
            </div>
        </form>
    )
}