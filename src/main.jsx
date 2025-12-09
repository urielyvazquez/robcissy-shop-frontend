// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import del componente central de la aplicación
import App from './App.jsx'; 

// Import de los estilos globales
import './index.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);