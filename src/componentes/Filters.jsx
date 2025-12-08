// src/componentes/Filters.jsx
import React, { useState } from 'react';

// Las categorías están definidas estáticamente aquí, pero podrían venir de las props
const categories = ['Todos', 'DC', 'One Piece', 'Hazbin Hotel', 'Tales of Arcadia'];

// Recibe la función de filtrado 'onFilter' como prop
const Filters = ({ onFilter }) => {
    // Estado local para saber qué categoría tiene el estilo 'active'
    const [activeCategory, setActiveCategory] = useState('Todos');

    const handleClick = (categoryName) => {
        // 1. Actualiza el estado visual del botón activo
        setActiveCategory(categoryName);
        
        // 2. Llama a la función de App.jsx para que filtre los productos.
        // Convertimos 'Todos' a 'all' para que coincida con la lógica de filtrado
        const catValue = categoryName === 'Todos' ? 'all' : categoryName;
        onFilter(catValue);
    };

    return (
        <div className="filters">
            {categories.map(category => {
                // El atributo data-cat debe ser el nombre de la categoría o 'all'
                const catData = category === 'Todos' ? 'all' : category;
                
                // Determinamos si este botón debe tener la clase activa
                const isActive = activeCategory === category;
                
                return (
                    <button
                        key={category} // Key es necesario para la iteración en React
                        className={`filter-btn ${isActive ? 'filter-btn--active' : ''}`}
                        data-cat={catData} // data-attributes se mantienen, pero no son necesarios para la lógica de React
                        onClick={() => handleClick(category)}
                    >
                        {category}
                    </button>
                );
            })}
        </div>
    );
};

export default Filters;