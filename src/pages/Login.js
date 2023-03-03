import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login (){
    const [email,setEmail] = useState('');
    const [emailV,setEmailV] = useState(false);
    const [pwV,setPwV] = useState(false);
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        localStorage.setItem('user', {email: email});
        history.push('/');
    };

    const emailValidation = (event) => {
        const { value } = event.target;
        const regexEmail =/^\S+@\S+\.\S+$/;
        setEmailV(false);
        if (regexEmail.test(value)) {
            setEmail(value);
            setEmailV(true);
        };
    };

    const pwValidation = (event) => {
        const { value } = event.target;
        const regexPw = /^.{6,}$/;
        setPwV(false);
        if (regexPw.test(value)) {
            setPwV(true);
        };
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='email-input'>E-mail: </label>
            <input
                name="email-input"
                type="text"
                data-testid="email-input"
                onChange={emailValidation}
            />
            <label htmlFor='password-input'>Senha: </label>
            <input
                name="password-input"
                type="password"
                data-testid="password-input"
                onChange={pwValidation}
            />
            <button
                type="submit"
                data-testid="login-btn"
                disabled={ (emailV && pwV)? null : 'disabled'}
                value="Submit"
            >
                Login
            </button>
        </form>
    );
};

export default Login;