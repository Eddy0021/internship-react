import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Login.css';

import Api from '../../constants/apiPaths';
import { UserProps } from '../../Interfaces/Iuser';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

const Login = () => {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (newText: string) => {
        setEmail(newText);
    };

    const handlePasswordChange = (newText: string) => {
        setPassword(newText);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = { 
            email: email,
            password: password
        } as UserProps
        
        try {
            const response = await Api.fetchLogin(user);

            localStorage.setItem('token', response.result);
            localStorage.setItem('name', response.user.name);

            navigate('/');
        } catch (error) {
           alert(error)     
        }
    };

    return (
        <div className="box">
            <h3>Login</h3>
            <div className="box-form">
                <form onSubmit={handleSubmit}>
                    <div className="input">
                        <label>Email:</label>
                        <Input input={{ type: 'text', placeholder: 'Enter your email', required: true, width: '20rem' }} textChanged={handleEmailChange} />
                    </div>
                    <div className="input">
                        <label>Password:</label>
                        <Input input={{ type: 'password', placeholder: 'Enter your password', required: true, width: '20rem' }} textChanged={handlePasswordChange} />
                    </div>
                    <Button name='LOGIN' width='21.5rem' />
                </form>
                <div className="footer">
                    If you don't have an account you may <Link to="/registration">Register</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;
