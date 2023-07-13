import React, {useEffect} from 'react';
import s from './Header.module.css'
import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {getAuthUserDataTC} from '../../redux/auth-reducer';
import {AppRootStateType} from '../../redux/store';


const Header = () => {
    const isAuth = useSelector<AppRootStateType, boolean>((state) => state.auth.isAuth)
    const login = useSelector<AppRootStateType, any>((state) => state.auth.login)


    useEffect(() => {
        getAuthUserDataTC()
    }, []);

    return (
        <header className={'header'}>
            <img
                alt={'picture'}
                src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAhFBMVEX///8REREAAAAODg4ICAgGBgb6+vpqamr8/Pz39/fg4OAvLy/X19fw8PDd3d2Li4uxsbHp6em7u7snJydzc3PCwsKenp6BgYHGxsY/Pz+Tk5NfX18sLCxRUVF8fHzS0tI2Njanp6dMTEw9PT2Hh4cdHR2ZmZlaWlpOTk6srKxkZGQXFxcdh3xcAAAEPElEQVR4nO3a2ZaqMBAF0KbEARQFRHBGnLja//9/l4DYDkxCArjW2U/9YqCoSkKK/vkBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgPZQm76BJAOF31i6wW8sPgaqZ4/4DWee+Y3Fg6Fb+yXPhz6SOZZDVdrcWdDe7PEc0yCb53BVuOcFEW05rwralPgOWE5P9VZBdLTzeBfU4B8tOQ/5OVW3hiw8us75D94nanYh1WbbQxCb3CU6iti0JkR9AcMWNHCXuyC6bqdDNNQHIi5xIYlmIgbOp4ztVRidJMnBYxZQnoxLHXnaxFah6n028YLoJKlLJ66b3yONZKn+ItXMLYtOZtFJrDz5bn5PDiTVXKTKfLlm0YXJi8qT47vZG4vYM6xtJVVGZ/+eOyZI31no1T1iT3Eo8hJ/xpfrNJ54cXluBJYn44aXq2MaaqZ1ekoeW13IGgu+7EAKryj6nVSbT4Yv0bHy3NniV/A+RRczxV1Cc5f+W3SsPFczIZv7M51uj1PQTvsz8vzT08S7r55OLQ0Fo3t7suSKGF236D150ebn1ZA+xqd4SvDejozZcZeQuyg+EUeHZHGNcq5SzZ1sknIXlac0qa/fpfw9Yn6vNCN7IyUnL0zfWhe7+T3b3lPIZ7cYGJc+pUUXvZuJmO7pxg+3QquqoxnmNmXi3a5Aa2FHhzTXvxRKnVOV4lHmxz0746VFx8qTc9+sCJce76H8UuPa+4zSvJWnJfLokMZ/jrBMmfZUL2vixeU5PGvc776AMb3cyKeLgGpamRMvLk9/Vnt5RvqvER4++LEycw5pO95zeW5FHx1SaW8Pn6xivxy458OtdZSXvqHdUPoYm95uqUBLWBnb18xF8zG+VW3vZokW7xFK5GT+5LExlkMW1Nb9wOs6cwtxkbaoK7PtusDEi9O39hosz8gyMUKJtWRf762nmZPdQ2MsP33Xet/Nkm2SIwx3L8sbqYYWMMYj/djfFZt4kS5Nl634VK5kzCaZ7eG/00D4V7HKDAXluaj16JBhnpbC+F47six3ipXlw5MR2tb9TMJeUVFQ3bUfHbJYnCNkbd0W/RNA4FB46ShArqGt+7HcV67i2LtZu9IX4lWk4dGh6WAS8YmQvZu1rjxvOEQYpG/K/T9C+Kk8D1l5Nnt0yLGotpZ26bfGtm4pToUyDdK3u7S3PG/00hG25eiQRysZYRNt3ZJWZUIk2uutL89Y3uHiXVNt3dL8z0IMyrOZtm55aqGOUoRtfmZN32w5uhRNYqNt3UoK7Ylh3+xrVpdXTl6hBuH9Wt+w+aWyM3toRLQyv2x1eeMOKbFUO6zL5uvfHl7IXLz06cPgaLpt6pOYAO4k/IR7t/adWcvPDZ8zRpflxHGOk7PuGl+7cAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAd/gOVsC9keTWc5QAAAABJRU5ErkJggg=='}/>
            <div className={s.loginBlock}>
                {
                    isAuth ?
                        login :
                        <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    )
}

export default Header