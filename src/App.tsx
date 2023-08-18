import React, {useEffect} from 'react';
import './App.css'
import {Route, Routes} from 'react-router-dom'
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import {Users} from 'components/Users/Users';
import Dialogs from './components/Dialogs/Dialogs';
import {Login} from 'components/Login/Login';
import {useAppDispatch, useAppSelector} from 'redux/store';
import {initializeTC} from 'redux/app-reducer';
import {Preloader} from 'components/common/Preloader/Preloader';


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
                    <Route path="/dialogs" element={<Dialogs/>}/>
                    <Route path="/profile/:userId?" element={<Profile/>}/>
                    <Route path="/users" element={<Users/>}/>
                    <Route path="/music" element={<Users/>}/>
                    <Route path="/settings" element={<Users/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
