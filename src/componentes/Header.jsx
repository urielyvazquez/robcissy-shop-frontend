// src/componentes/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom'; 

const Header = ({ cartCount, favCount, toggleCart }) => {
    return (
        <header className="header">
            {/* 1. Logo: Ir al Catálogo */}
            <Link to="/" className="header__logo"> {/* Usar Link para navegar al HOME (/) */}
                <img
                    src="/Imagenes/Logo.png"
                    alt="Logo RobCissy Shop"
                    className="header-logo-img" 
                />
                RobCissy Shop
            </Link>
            
            <div className="header__actions">
                {/* 2. Botón de Favoritos (Wishlist): Dirige a /favoritos */}
                <Link 
                    to="/favoritos" // Usar Link para navegar a la ruta /favoritos
                    className="action-btn" 
                    id="btn-favs"
                >
                    <i className="fas fa-heart"></i>
                    {favCount > 0 && (
                        <span className="badge" id="badge-fav">
                            {favCount}
                        </span>
                    )}
                </Link>
                
                {/* 3. Botón de Carrito (Sigue siendo un botón que abre el Modal) */}
                <button 
                    className="action-btn" 
                    id="btn-cart"
                    onClick={toggleCart} 
                >
                    <i className="fas fa-shopping-cart"></i>
                    {cartCount > 0 && (
                        <span className="badge" id="badge-cart">
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>
        </header>
    );
};

export default Header;