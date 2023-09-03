import React, {useEffect} from 'react';
import './App.css'
import {Navigate, Route, Routes} from 'react-router-dom'
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import {Login} from 'components/Login/Login';
import {useAppDispatch, useAppSelector} from 'redux/store';
import {initializeTC} from 'redux/app-reducer';
import {Preloader} from 'components/common/Preloader/Preloader';
import {withSuspense} from 'components/hoc/withSuspense';


const Dialogs = React.lazy(() => import('./components/Dialogs/Dialogs'))
const Users = React.lazy(() => import('./components/Users/Users'))


const App = () => {
    const dispatch = useAppDispatch()
    const initialized = useAppSelector<boolean>(state => state.app.initialized)

    useEffect(() => {
        dispatch(initializeTC())
    }, [])

    if (!initialized) {
        return <Preloader/>
    }
    return (
        <div className={'app-wrapper'}>
            <Header/>
            <Navbar/>
            <div className={'app-wrapper-content'}>
                <Routes>
                    <Route path="/dialogs" element={withSuspense(Dialogs)}/>
                    <Route path="/profile/:userId?" element={<Profile/>}/>
                    <Route path="/users" element={withSuspense(Users)}/>
                    <Route path="/music" element={<Users/>}/>
                    <Route path="/settings" element={<Users/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                    <Route path={'/socialNetwork'} element={<Navigate to={'/profile'}/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
