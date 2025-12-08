// src/componentes/Catalog.jsx
import React from 'react';
import ProductCard from './ProductCard.jsx'; // Importamos el componente de tarjeta

// Recibe la lista de productos y las funciones de manejo del estado global
const Catalog = ({ products, toggleWishlist, addToCart, wishlist }) => {
    
    // Si el array de productos está vacío, mostramos el loader.
    // (En App.jsx ya manejamos que 'products' sea un array vacío al inicio)
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
        // Utilizamos la clase 'catalogo'
        <div id="catalogo" className="catalogo">
            {/* Iteramos sobre el array de productos y creamos una ProductCard por cada uno */}
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    product={product} // Le pasamos el objeto completo del producto
                    // Le pasamos las funciones y el estado del wishlist a cada tarjeta
                    onToggleWishlist={toggleWishlist} 
                    onAddToCart={addToCart} 
                    isFav={wishlist.has(product.id)}
                />
            ))}
        </div>
    );
};

export default Catalog;