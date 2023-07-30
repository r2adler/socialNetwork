import {NavLink} from 'react-router-dom'
import {FC} from 'react'
import s from './DialogItem.module.css'


interface DialogItemProps {
    name: string
    id: number
}

const DialogItem: FC<DialogItemProps> = (props) => {


    return (
        <div>
            <NavLink
                to={`/dialogs/${props.id}`}
                className={({isActive}) => isActive ? s.activeLink : undefined}
            >
                {props.name}
            </NavLink>
        </div>
    )
}

export default DialogItem