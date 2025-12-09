// src/componentes/WishlistPage.jsx

import React from 'react';
import ProductCard from './ProductCard.jsx'; 
import Catalog from './Catalog.jsx'; 
import { Link } from 'react-router-dom'; 

const WishlistPage = ({ products, wishlist, toggleWishlist, isFavorite, onAddToCart }) => {
    
    const favoriteProducts = products.filter(product => 
        wishlist.has(product.id)
    );

    return (
        <div className="wishlist-page">
            <h1 className="page__title">Mis Favoritos ({favoriteProducts.length})</h1>

            {favoriteProducts.length === 0 ? (
                <div className="empty-state">
                    <h2>Tu lista de deseos está vacía.</h2>
                    <p>
                        ¡Parece que aún no has marcado nada como favorito! 
                        <Link to="/">Explora nuestro catálogo</Link> para empezar a guardar.
                    </p>
                </div>
            ) : (
                <section className="catalogo">
                    {favoriteProducts.map(product => (
                        <ProductCard 
                            key={product.id}
                            product={product}
                            onToggleWishlist={toggleWishlist} 
                            onAddToCart={onAddToCart}
                            isFav={isFavorite(product.id)} 
                        />
                    ))}
                </section>
            )}
        </div>
    );
};

export default WishlistPage;