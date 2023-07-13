import React, {FC, useEffect} from 'react';
import {Preloader} from '../../common/Preloader/Preloader';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../../redux/store';
import axios from 'axios';
import {ProfileType, setUserProfile} from '../../../redux/profile-reducer';


const ProfileInfo: FC = () => {
    const profile = useAppSelector<ProfileType | null>(state => state.profilePage.profile);
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                dispatch(setUserProfile(response.data))
            })
    }, []);


    if (!profile) {
        return <Preloader/>
    }

    return (
        <div key={profile.userId}>
            <div>
                <img
                    src={'data:image/jpeg;base64,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'}/>
            </div>
            <div style={{padding: '10px'}}>
                <img src={profile.photos.large} alt="profileInfo"/>
                <p>{profile.fullName}</p>
                <p>About me: {profile.aboutMe}</p>
                <div>Contacts:
                    <p> - {profile.contacts.facebook}</p>
                    <p> - {profile.contacts.website}</p>
                    <p> - {profile.contacts.vk}</p>
                    <p> - {profile.contacts.twitter}</p>
                    <p> - {profile.contacts.instagram}</p>
                    <p> - {profile.contacts.youtube}</p>
                    <p> - {profile.contacts.github}</p>
                    <p> - {profile.contacts.mainLink}</p>
                </div>
                <p>
                    Looking for a job? {profile.lookingForAJob ? 'No' :
                    profile.lookingForAJobDescription}
                </p>
            </div>
        </div>
    )
}

export default ProfileInfo