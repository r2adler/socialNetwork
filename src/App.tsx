import React from 'react';
import './App.css'
import {Route, Routes} from 'react-router-dom'
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import {Users} from './components/Users/Users';
import Dialogs from './components/Dialogs/Dialogs';
import {Login} from './components/Login/Login';


const App = () => {
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
