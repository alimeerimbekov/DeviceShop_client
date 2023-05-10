import React from 'react';
import NavBar from "../components/NavBar/NavBar";
import {Outlet} from "react-router";

const Layout = () => {
    return (
        <>
            <NavBar/>
            <Outlet/>
        </>
    );
};

export default Layout;