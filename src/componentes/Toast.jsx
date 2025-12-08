// src/componentes/Toast.jsx
import React from 'react';

// Recibe el mensaje a mostrar (o null)
const Toast = ({ message }) => {
    
    // Si 'message' no es nulo, añadimos la clase 'toast--visible'
    const toastClass = `toast ${message ? 'toast--visible' : ''}`;

    return (
        <div 
            id="toast" 
            className={toastClass}
        >
            {/* Si message es null, se muestra un string vacío. Si tiene valor, se muestra el mensaje. */}
            {message}
        </div>
    );
};

export default Toast;