import React, {FC} from 'react';
import {useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from 'redux/store';
import {logInTC} from 'redux/auth-reducer';
import {Navigate} from 'react-router-dom';


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
}
export const LoginForm = () => {
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            password: '',
            email: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.password) {
                errors.email = 'Required'
            } else if (values.email.length <= 3) {
                errors.email = 'Login should be more than 3 symbols'
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
            formik.resetForm()
            dispatch(logInTC(values.email, values.password, values.rememberMe))
        },
    });


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
            {/*<div style={{display:'inline-block', border: 'red 1px solid', padding: '5px', color: 'red'}}>*/}
            {/*    error*/}
            {/*</div>*/}
            <div>
                <button type={'submit'}>Login</button>
            </div>
        </form>
    )
}


