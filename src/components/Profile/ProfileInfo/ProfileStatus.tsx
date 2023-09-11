import React, {ChangeEvent, FC, useState} from 'react';
import {useAppDispatch, useAppSelector} from 'redux/store';
import { profileThunks} from 'redux/profile-reducer';


export const ProfileStatus: FC = () => {
    const status = useAppSelector<string>(state => state.profilePage.status)
    const dispatch = useAppDispatch()

    const [editMode, setEditMode] = useState(false)
    const [tempStatus, setTempStatus] = useState(status)


    const activateEditeMode = () => {
        setEditMode(true)
    }
    const deactivateEditeMode = () => {
        setEditMode(false)
        dispatch(profileThunks.updateUserStatus(tempStatus))
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTempStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditeMode}>{tempStatus}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input
                        autoFocus={true}
                        onBlur={deactivateEditeMode}
                        type="text"
                        value={tempStatus}
                        onChange={(e) => onStatusChange(e)}
                    />
                </div>
            }
        </div>
    );
}

