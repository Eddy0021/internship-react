import React, { useState } from 'react';

interface InputProps {
    input: {
        type: string;
        placeholder: string;
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
        <input type={input.type} placeholder={input.placeholder} value={text} onChange={handleInputChange} />
    );
};

export default Input;
