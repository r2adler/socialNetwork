import React, {FC} from 'react';
import {useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from 'redux/store';
import {Navigate} from 'react-router-dom';
import {authThunks} from 'redux/auth-reducer';


export const Login: FC = () => {
    const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)
    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }
    return (
        <>
            <h1>Login</h1>
            <LoginForm/>
        </>
    );
};

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
    captcha?: null | string
}
export const LoginForm = () => {
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const captcha = useAppSelector(state => state.auth.captcha)
    const resetCaptcha = () => {
        formik.setFieldValue('captcha', '');
    };

    const formik = useFormik({
        initialValues: {
            password: '',
            email: '',
            rememberMe: false,
            captcha: null
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            const correctEmailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
            if (!values.email) {
                errors.email = 'Required'
            } else if (!correctEmailRegExp.test(values.email)) {
                errors.email = 'Enter the correct EMAIL'
            }

            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length <= 3) {
                errors.password = 'Password should be more than 3 symbols'
            }

            return errors
        },
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2))
            dispatch(authThunks.logIn({
                email: values.email,
                password: values.password,
                rememberMe: values.rememberMe,
                captcha: values.captcha
            }))
            resetCaptcha();
        },
    });

    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }
    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <input type="text" placeholder={'Email'} {...formik.getFieldProps('email')}/>
                {formik.errors.email && formik.touched.email ?
                    <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
            </div>
            <div>
                <input type="text" placeholder={'Password'} {...formik.getFieldProps('password')}/>
                {formik.errors.password && formik.touched.password ?
                    <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
            </div>
            <div>
                <input type={'checkbox'} {...formik.getFieldProps('rememberMe')} checked={formik.values.rememberMe}/>
                remember me
            </div>
            {captcha &&
                <div>
                    <img src={captcha} alt="captcha"/>
                    <input type="text" placeholder={'Symbols from imag'} {...formik.getFieldProps('captcha')}/>
                    {formik.errors.captcha && formik.touched.captcha ?
                        <div style={{color: 'red'}}>{formik.errors.captcha}</div> : null}
                </div>
            }
            <div>
                <button type={'submit'}>Login</button>
            </div>
        </form>
    )
}


