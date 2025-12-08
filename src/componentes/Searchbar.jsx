// src/componentes/Searchbar.jsx
import React from 'react';

// Recibe la función 'onSearch' como prop
const SearchBar = ({ onSearch }) => {
    
    // Función que se dispara con cada cambio en el input
    const handleChange = (e) => {
        // Llama a la función 'onSearch' (definida en App.jsx) y le pasa el valor
        onSearch(e.target.value);
    };

    return (
        <div className="search-container">
            <input 
                type="text" 
                id="search-input" 
                placeholder="Buscar Stickers one piece, Robins, Lucifer..." 
                className="search-input"
                onChange={handleChange} // Vinculamos la función al evento 'onChange'
            />
        </div>
    );
};

export default SearchBar;