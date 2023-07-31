import React, {FC} from 'react';
import {useFormik} from 'formik';

export const Login: FC = () => {
    return (
        <>
            <h1>Login</h1>
            <LoginForm/>
        </>
    );
};

type FormikErrorType = {
    login?: string
    password?: string
    rememberMe?: boolean
}
export const LoginForm = () => {
    const formik = useFormik({
        initialValues: {
            password: '',
            login: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.password) {
                errors.login = 'Required'
            } else if (values.login.length <= 3) {
                errors.login = 'Login should be more than 3 symbols'
            }

            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length <= 3) {
                errors.password = 'Password should be more than 3 symbols'
            }
            return errors
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2))
            formik.resetForm()
            // dispatch(loginTC(values))
        },
    });


    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <input type="text" placeholder={'Login'} {...formik.getFieldProps('login')}/>
                {formik.errors.login && formik.touched.login ?
                    <div style={{color: 'red'}}>{formik.errors.login}</div> : null}
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
            <div>
                <button type={'submit'}>Login</button>
            </div>
        </form>
    )
}


