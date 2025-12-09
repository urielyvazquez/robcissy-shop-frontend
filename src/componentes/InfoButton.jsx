// src/componentes/InfoButton.jsx

import React from 'react';
import { Link } from 'react-router-dom';

// Recibe el ID del producto para construir la URL
const InfoButton = ({ productId }) => {
    return (
        <Link 
            to={`/producto/${productId}`} 
            className="producto__btn producto__btn--detail"
        >
            Ver Detalles
        </Link>
    );
};

export default InfoButton;