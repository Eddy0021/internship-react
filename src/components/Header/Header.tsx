import { useState } from "react";

import Logo from "./components/Logo/Logo";
import Button from "../../common/Button/Button";

import './Header.css'

interface Header {
    name: string,
    auth: boolean,
}

export default function Header(props: Header) {
    const [ name ] = useState(props.name);
    return (
       <header>
            <Logo />
            <div className="info-and-button">
                <span>{ name }</span>
                <Button name="LOGOUT" />
            </div>
       </header>
    );
}
