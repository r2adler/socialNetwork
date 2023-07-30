import s from './Navbar.module.css'
import {NavLink} from 'react-router-dom';


const Navbar = () => {

    return (
        <nav className={'nav'}>
            <div className={s.item}>
                <NavLink to="/profile" className={({isActive}) => isActive ? s.activeLink : undefined}>
                    Profile
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/dialogs"
                         className={({isActive}) => isActive ? s.activeLink : undefined}>
                    Messages
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/users" className={({isActive}) => isActive ? s.activeLink : undefined}>
                    Users
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/news" className={({isActive}) => isActive ? s.activeLink : undefined}>
                    News
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/music" className={({isActive}) => isActive ? s.activeLink : undefined}>
                    Music
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/settings" className={({isActive}) => isActive ? s.activeLink : undefined}>
                    Settings
                </NavLink>
            </div>
        </nav>
    )
}

export default Navbar