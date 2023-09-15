import {FC} from 'react';
import {ProfileType} from 'redux/profile-reducer';
import {Contact} from 'components/Profile/ProfileInfo/ProfileData/Contact/Contact';

type Props = {
    profile: ProfileType
    isOwner: boolean
    goToEditeMode: () => void
}

export const ProfileData: FC<Props> = ({ profile, isOwner, goToEditeMode }) => {
    return (
        <div>
            {isOwner && (
                <div>
                    <button onClick={goToEditeMode}>edit</button>
                </div>
            )}
            <div>
                <b>Full name:</b> {profile.fullName}
            </div>
            <div>
                <b>About me:</b> {profile.aboutMe}
            </div>
            <div>
                <b>Looking for a job:</b> {profile.lookingForAJob ? `yes` : "no"}
            </div>
            <div>
                <b>My professional skills:</b> {profile.lookingForAJobDescription}
            </div>
            <div>
                <b>Contacts:</b>{" "}
                {Object.entries(profile.contacts).map((el) => (
                    <Contact key={el[0]} title={el[0]} value={el[1]} />
                ))}
            </div>
        </div>
    )
}