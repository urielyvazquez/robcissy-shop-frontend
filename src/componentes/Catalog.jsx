// src/componentes/Catalog.jsx

import React from 'react';
import ProductCard from './ProductCard.jsx'; 

// 🚨 CORRECCIÓN: Recibe 'isFavorite' en lugar de 'wishlist'
const Catalog = ({ products, toggleWishlist, addToCart, isFavorite }) => {
    
    if (products.length === 0) {
        return (
            <div id="loader" className="catalogo">
                <div className="loader">
                    <i className="fas fa-spinner fa-spin"></i> Cargando productos...
                </div>
            </div>
        );
    }

    return (
        <div id="catalogo" className="catalogo">
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    product={product} 
                    onToggleWishlist={toggleWishlist} 
                    onAddToCart={addToCart} 
                    // 🚨 CORRECCIÓN: Llama a la función 'isFavorite'
                    isFav={isFavorite(product.id)}
                />
            ))}
        </div>
    );
};

export default Catalog;