import React, { useState } from 'react';

interface InputProps {
    input: {
        type: string;
        placeholder: string;
        required?: boolean;
        width?: string;
    };
    textChanged: (data: string) => void;
}

const Input: React.FC<InputProps> = ({ input, textChanged }) => {
    const [text, setText] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newText = event.target.value;
        setText(newText);
        textChanged(newText);
    };

    return (
        <input 
            type={input.type} 
            style={{ width: input.width }}
            placeholder={input.placeholder} 
            required={input.required} 
            value={text} 
            onChange={handleInputChange} 
            className='default-input' />
    );
};

export default Input;
