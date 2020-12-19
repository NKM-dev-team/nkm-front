import React from 'react';
import { useForm } from "react-hook-form";
import './index.sass';

import AuthService from "../../services/auth.service";

function LoginForm() {
    const { register, handleSubmit, errors } = useForm();
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