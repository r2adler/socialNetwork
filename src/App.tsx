import React, {FC} from 'react';
import './App.css'
import {Route, Routes} from 'react-router-dom'
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Users from './components/Users/Users';
import Dialogs from './components/Dialogs/Dialogs';



const App: FC = () => {

    return (
        <div className={'app-wrapper'}>
            <Header/>
            <Navbar/>
            <div className={'app-wrapper-content'}>
                <Routes>
                    <Route path="/dialogs" element={<Dialogs/>}/>
                    <Route path="/profile/:userId?" element={<Profile/>}/>
                    <Route path="/users" element={<Users/>}/>
                    <Route path="/music" element={<Profile/>}/>
                    <Route path="/settings" element={<Profile/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
