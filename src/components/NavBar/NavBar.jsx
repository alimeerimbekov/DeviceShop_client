import React, {useContext} from 'react';
import {Context} from '../../index'
import {NavLink, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";


const NavBar = observer(() => {

    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className='container'>
                <div className="container-fluid d-flex justify-content-between">
                    <NavLink className="navbar-brand" href="#" to={'/shop'}>DeviceShop</NavLink>
                    {
                        user.isAuth ?
                            <div className='m-lg-1 d-flex column-gap-2'>
                                <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin')}>Админ панель</button>
                                <button type="button" className="btn btn-secondary" onClick={logOut}>Выйти</button>
                            </div>
                            :
                            <div className='m-lg-1 d-flex column-gap-2'>
                                <button type="button" className="btn btn-secondary"
                                        onClick={() => navigate('/login')}>Авторизация
                                </button>
                            </div>
                    }
                </div>
            </div>
        </nav>
    )
});

export default NavBar;