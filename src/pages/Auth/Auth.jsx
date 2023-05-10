import React, {useContext, useState} from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {login, registers} from "../../http/userAPI";
import {Form, FormControl} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {toast} from "react-toastify";

const Auth = observer(() => {

    const location = useLocation()
    const isLogin = location.pathname === '/login'
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        getValues,
        formState: {errors},
    } = useForm({mode: 'onTouched'})

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
       try {
           let data;
           if (isLogin) {
               data = await login(email, password)
           } else {
               data = await registers(email, password)
           }
           user.setUser(user)
           user.setIsAuth(true)
           navigate('/shop')
       } catch (err) {
            toast({
                title: err.response.data.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'center-top'
            })
       }
    }

    return (
        <div
            className='container d-flex justify-content-center align-items-center'
            style={{height: window.innerHeight - 54}}
        >
            <div className="card p-5" style={{width: 600}}>
                <h2 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-inline-flex flex-column" onSubmit={handleSubmit(click)}>
                    <FormControl
                        className="form-control mt-3"
                        placeholder='Введите ваш email...'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    ></FormControl>
                    <FormControl
                        className="form-control mt-3"
                        placeholder='Введите пароль...'
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    ></FormControl>
                    <div className="d-flex justify-content-between flex-row align-items-center mt-3 pl-3 pr-3">
                        {
                            isLogin ?
                                <div>Нет аккаунта ? <NavLink to={'/register'}>Зарегистрируйтесь !</NavLink></div>
                                :
                                <div>Есть аккаунт ? <NavLink to={'/login'}>Войдите !</NavLink></div>

                        }
                        <button className='btn btn-primary' type='submit'>{isLogin ? 'Войти' : 'Регистрация'}</button>
                    </div>
                </Form>
            </div>


        </div>
    );
});

export default Auth;