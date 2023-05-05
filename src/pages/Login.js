import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';

function Login (){
    const { email, setEmail } = useContext(Context);

    const [emailV,setEmailV] = useState(false);
    const [pwV,setPwV] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        localStorage.setItem('user', JSON.stringify({email}));
        navigate('/meals');
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
            <label htmlFor='password-input'>Password: </label>
            <input
                name="password-input"
                type="password"
                data-testid="password-input"
                onChange={pwValidation}
            />
            <button
                type="submit"
                data-testid="login-btn"
                disabled={ (emailV && pwV) ? null : 'disabled'}
                value="Submit"
            >
                Login
            </button>
        </form>
    );
};

export default Login;