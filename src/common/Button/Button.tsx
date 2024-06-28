import './Button.css';

interface ButtonProps {
    name: string,
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
    const { name, onClick } = props;

    return (
        <>  
            <button onClick={onClick}>{ name }</button>
        </>
    )
}

export default Button