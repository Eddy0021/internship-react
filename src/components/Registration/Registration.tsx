import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../Login/Login.css';

import Api from '../../constants/apiPaths';
import { UserProps } from '../../Interfaces/Iuser';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

const Login = () => {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = (newText: string) => {
        setName(newText);
    };

    const handleEmailChange = (newText: string) => {
        setEmail(newText);
    };

    const handlePasswordChange = (newText: string) => {
        setPassword(newText);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = { 
            name: name,
            email: email,
            password: password
        } as UserProps
        
        try {
            await Api.fetchRegistration(user);
            
            navigate('/login');
        } catch (error) {
           alert(error)     
        }
    };

    return (
        <div className="box">
            <h3>Registration</h3>
            <div className="box-form">
                <form onSubmit={handleSubmit}>
                    <div className="input">
                        <label>Name:</label>
                        <Input input={{ type: 'text', placeholder: 'Enter your name', required: true, width: '20rem' }} textChanged={handleNameChange} />
                    </div>
                    <div className="input">
                        <label>Email:</label>
                        <Input input={{ type: 'text', placeholder: 'Enter your email', required: true, width: '20rem' }} textChanged={handleEmailChange} />
                    </div>
                    <div className="input">
                        <label>Password:</label>
                        <Input input={{ type: 'password', placeholder: 'Enter your password', required: true, width: '20rem' }} textChanged={handlePasswordChange} />
                    </div>
                    <Button name='REGISTER' width='21.5rem' />
                </form>
                <div className="footer">
                    If you have an account you may <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;
