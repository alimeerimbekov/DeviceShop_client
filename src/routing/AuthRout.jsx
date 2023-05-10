import React, {useContext, useEffect, useState} from 'react';
import {Routes, Route} from "react-router";
import Auth from "../pages/Auth/Auth";
import Layout from "../Layout/Layout";
import Shop from "../pages/Shop/Shop";
import DevicePage from "../pages/DevicePage/DevicePage";
import {Context} from "../index";
import PrivateRout from "./PrivateRout";
import Admin from "../pages/Admin/Admin";
import Basket from "../pages/Basket/Basket";
import {observer} from "mobx-react-lite";
import {check} from "../http/userAPI";
import {Spinner} from "react-bootstrap";

const AuthRout = observer(() => {

    const {user} = useContext(Context)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            user.setUser(true)
            user.setIsAuth(true)
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation={'grow'}/>
    }

    return (
        <Routes>
            <Route path={''} element={<Layout/>}>
                <Route path='login' element={<Auth/>}/>
                <Route path='register' element={<Auth/>}/>
                <Route path='shop' element={<Shop/>}/>
                <Route path='device/:id' element={<DevicePage/>}/>
                {
                  user.isAuth &&
                    <>
                        <Route path='admin' element={<Admin/>}/>
                        <Route path='basket' element={<Basket/>}/>
                    </>
                }
            </Route>
        </Routes>
    );
});

export default AuthRout;