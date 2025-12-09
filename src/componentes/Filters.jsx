// src/componentes/Filters.jsx
import React, { useState } from 'react';

const categories = ['Todos', 'DC', 'One Piece', 'Hazbin Hotel', 'Tales of Arcadia'];

const Filters = ({ onFilter }) => {
    const [activeCategory, setActiveCategory] = useState('Todos');

    const handleClick = (categoryName) => {
        setActiveCategory(categoryName);
        
        const catValue = categoryName === 'Todos' ? 'all' : categoryName;
        onFilter(catValue);
    };

    return (
        <div className="filters">
            {categories.map(category => {
                const catData = category === 'Todos' ? 'all' : category;
                
                const isActive = activeCategory === category;
                
                return (
                    <button
                        key={category} 
                        className={`filter-btn ${isActive ? 'filter-btn--active' : ''}`}
                        data-cat={catData} 
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