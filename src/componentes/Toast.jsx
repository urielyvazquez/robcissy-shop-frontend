// src/componentes/Toast.jsx
import React from 'react';

// Recibe el mensaje a mostrar (o null)
const Toast = ({ message }) => {
    
    const toastClass = `toast ${message ? 'toast--visible' : ''}`;

    return (
        <div 
            id="toast" 
            className={toastClass}
        >
            {message}
        </div>
    );
};

export default Toast;