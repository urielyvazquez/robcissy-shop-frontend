// src/componentes/Header.jsx
import React from 'react';

// Recibe las props definidas en App.jsx
const Header = ({ cartCount, favCount, toggleCart }) => {
    return (
        // Utilizamos 'className' en lugar de 'class'
        <header className="header">
            {/* Logo de la tienda */}
            <div className="header__logo">
                <img
                    src="/Imagenes/Logo.png"
                    alt="Logo RobCissy Shop"
                    className="header-logo-img" 
                />

                RobCissy Shop
            </div>
            
            <div className="header__actions">
                {/* 1. Botón de Favoritos (Wishlist) */}
                <button 
                    className="action-btn" 
                    id="btn-favs"
                    // En React, no usamos el 'onclick' global; simplemente es 'onClick'
                >
                    <i className="fas fa-heart"></i>
                    {/* El badge se muestra condicionalmente si hay favoritos (favCount > 0) */}
                    {favCount > 0 && (
                        <span className="badge" id="badge-fav">
                            {favCount}
                        </span>
                    )}
                </button>
                
                {/* 2. Botón de Carrito */}
                <button 
                    className="action-btn" 
                    id="btn-cart"
                    onClick={toggleCart} // Llama a la prop 'toggleCart' para abrir el modal
                >
                    <i className="fas fa-shopping-cart"></i>
                    {/* El badge se muestra condicionalmente si hay ítems en el carrito (cartCount > 0) */}
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