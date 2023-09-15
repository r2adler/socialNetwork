import React, {FC} from 'react';
import {profileThunks, ProfileType} from 'redux/profile-reducer';
import {useFormik} from 'formik';
import {useAppDispatch} from 'redux/store';


type Props = {
    profile: ProfileType | null
    goToSaveMode: () => void
}

export const ProfileDataForm: FC<Props> = ({profile, goToSaveMode}) => {
    const dispatch = useAppDispatch()
    const formik = useFormik({
        validate: (values) => {
            const errors: Partial<ProfileType> = {}
            if (!values.fullName) {
                errors.fullName = 'Required'
            }
            if (!values.aboutMe) {
                errors.aboutMe = 'Required'
            }
            if (!values.lookingForAJobDescription) {
                errors.lookingForAJobDescription = 'Required'
            }

            return errors
        },
        initialValues: {
            fullName: '',
            aboutMe: '',
            lookingForAJob: false,
            lookingForAJobDescription: '',
            contacts: {
                facebook: '',
                website: '',
                vk: '',
                twitter: '',
                instagram: '',
                youtube: '',
                github: '',
                mainLink: ''
            }
        },
        onSubmit: values => {
            goToSaveMode()
            dispatch(profileThunks.saveProfile(values))
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <button type={'submit'}>save</button>
            </div>

            <div>
                <b>Full name:</b>
                <input type="text" placeholder={'Full name'} {...formik.getFieldProps('fullName')}/>
                {formik.errors.fullName && formik.touched.fullName ?
                    <div style={{color: 'red'}}>{formik.errors.fullName}</div> : null}
            </div>
            <div>
                <b>About me:</b>
                <textarea placeholder={'About me'} {...formik.getFieldProps('aboutMe')}/>
                {formik.errors.aboutMe && formik.touched.aboutMe ?
                    <div style={{color: 'red'}}>{formik.errors.aboutMe}</div> : null}
            </div>
            <div>
                <b>Looking for a job:</b>
                <input type={'checkbox'} {...formik.getFieldProps('lookingForAJob')}
                       checked={formik.values.lookingForAJob}/>
                remember me
            </div>
            <div>
                <b>My professional skills:</b>
                <textarea
                    placeholder={'My professional skills'} {...formik.getFieldProps('lookingForAJobDescription')}/>
                {formik.errors.lookingForAJobDescription && formik.touched.lookingForAJobDescription ?
                    <div style={{color: 'red'}}>{formik.errors.lookingForAJobDescription}</div> : null}
            </div>
            <div>
                <b>Contacts:</b>{' '}
                {Object.keys(profile!.contacts).map((key) => (
                    <div>
                        {key}: <input type="text" placeholder={key} {...formik.getFieldProps(`contacts.${key}`)}/>
                    </div>
                ))}
            </div>
        </form>
    )
}