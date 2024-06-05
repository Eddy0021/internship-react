import React, { useState } from 'react';

import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';

import './SearchBar.css';

interface SearchBarProps {
    textChanged: (data: string) => void;
}

const input = {
    type: "text",
    placeholder: "search by title or ID"
}

const SearchBar: React.FC<SearchBarProps> = ({ textChanged }) => {
    const [searchText, setSearchText] = useState("");

    const handleSearch = () => {
        const searchTextLower = searchText.toLowerCase();
        textChanged(searchTextLower);
    };    

    const handleInputChange = (text: string) => {
        setSearchText(text);
    };

    return (
        <div className="searchBar">
            <Input input={input} textChanged={handleInputChange} />
            <Button name="SEARCH" onClick={handleSearch} />
        </div>
    )
}

export default SearchBar;
