// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// Importamos el componente central de la aplicación
import App from './App.jsx'; 

// Importamos los estilos globales
import './index.css'; 
// Si tienes un archivo CSS llamado RobcissyShop.css (como se ve en una de tus imágenes), 
// también lo puedes importar aquí si contiene estilos adicionales:
// import './RobcissyShop.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);