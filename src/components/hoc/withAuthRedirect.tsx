import React from 'react';
import {Navigate} from 'react-router-dom';
import {AppRootStateType} from '../../redux/store';
import {connect} from 'react-redux';


const MapStateToProps = (state: AppRootStateType): mapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}

type mapStateToPropsType = {
    isAuth: boolean
}

export function WithAuthRedirect (Component: any) {
    const RedirectComponent = (props: mapStateToPropsType) => {
        const {isAuth, ...restProps} = props
        if (!isAuth) {
            return <Navigate to={'/login'}/>
        }
        return <Component {...restProps}/>
    }
    return connect(MapStateToProps)(RedirectComponent)
}
// переписать на функциональный манер