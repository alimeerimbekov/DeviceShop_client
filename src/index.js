import React from 'react';
import {createContext} from "react";
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/style.scss'
import {BrowserRouter} from "react-router-dom";
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Context.Provider value={{
            user: new UserStore(),
            device: new DeviceStore(),
        }}>
            <App/>
        </Context.Provider>
    </BrowserRouter>
);

