import React from 'react';
import { useForm } from "react-hook-form";
import './LoginForm.sass';
import axios from 'axios';

import AuthService from "./services/auth.service";

function LoginForm() {
    const { register, handleSubmit, errors } = useForm();
    // const doLogin = async (login, password) => {
    //     let data = {
    //         login: login,
    //         password: password,
    //     };

    //     try {
    //         const result = await axios.post('https://krzysztofruczkowski.pl:8080/api/login', data)
    //         const token = result.data;
    //         console.log('logged in');
    //         console.log(token);
    //     } catch (error) {
    //         console.warn(error.response.data);
    //     }
    // }
    // const onSubmit = ({login, password}) => doLogin(login, password);
    const onSubmit = ({login, password}) => {
        AuthService.login(login, password);
    }

    return (
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="login">Login</label>
                <input name="login" ref={register({ required: true })} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Hasło</label>
                <input name="password" type="password" ref={register({ required: true })} />
            </div>
            {errors.login && <span>Login wymagany</span>}
            {errors.password && <span>Hasło wymagane</span>}
            <input type="submit" value="Zaloguj się" />
        </form>
    );
}

export default LoginForm;