import { useEffect, useState } from "react";

import Logo from "./components/Logo/Logo";
import Button from "../../common/Button/Button";

import './Header.css'
import { useNavigate } from "react-router-dom";

interface Header {
    name: string,
    auth: boolean,
}

export default function Header() {
    const navigate = useNavigate();

    const showButton = location.pathname === '/login' || location.pathname === '/registration';
    
    const [ name, setName ] = useState<string | null>(null);
    const [ token, setToken ] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        
        // Set token state based on localStorage value
        if (storedToken) {
            setToken(storedToken);
            setName(localStorage.getItem('name'));
        }
    },[showButton])
    
    const handleClick = () => {
        setToken(null);
        setName(null);
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        navigate('/login');
    }

    return (
       <header>
            <Logo />
            {
                !showButton ? (
                    <div className="info-and-button">
                        { name !== null && <span>{ name }</span>}
                        <Button name={token ? "LOGOUT" : "LOGIN"} onClick={handleClick} />
                    </div>
                ) :
                <div></div>
            }           
       </header>
    );
}
