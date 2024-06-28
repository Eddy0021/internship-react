import './Button.css';

interface ButtonProps {
    name: string,
    width?: string,
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
    const { name, width, onClick } = props;

    return (
        <>  
            <button 
                onClick={onClick}
                style={{'width': width}}
            >{ name }</button>
        </>
    )
}

export default Button