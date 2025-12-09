// src/componentes/Searchbar.jsx
import React from 'react';

const SearchBar = ({ onSearch }) => {
    
    const handleChange = (e) => {
        onSearch(e.target.value);
    };

    return (
        <div className="search-container">
            <input 
                type="text" 
                id="search-input" 
                placeholder="Buscar Stickers one piece, Robins, Lucifer..." 
                className="search-input"
                onChange={handleChange} 
            />
        </div>
    );
};

export default SearchBar;