// src/componentes/ProductCard.jsx

import React from 'react';
// ✅ CORRECCIÓN: La variable importada ahora es InfoButton
import InfoButton from './InfoButton.jsx'; 


const ProductCard = ({ product, onToggleWishlist, onAddToCart, isFav }) => {
    const { id, name, price, img } = product;

    // Clase CSS para el botón de favoritos
    const favClass = `producto__fav-btn ${isFav ? 'producto__fav-btn--active' : ''}`;

    return (
        <article className="producto">
            
            {/* 1. Botón de Favoritos */}
            <button 
                className={favClass}
                onClick={() => onToggleWishlist(id)} 
            >
                <i className="fas fa-heart"></i>
            </button>
            
            {/* 2. Área de Imagen y Contenido (NO ES UN LINK) */}
            <div className="producto__visuals"> 
                
                <img src={img} alt={name} className="producto__imagen" />
                
                <div className="producto__contenido">
                    <h3 className="producto__titulo">{name}</h3>
                    <div className="producto__precio">${price.toFixed(2)}</div>
                </div>
            </div> 
            
            {/* 3. Contenedor de Acciones de Botones */}
            <div className="producto__actions">

                {/* Botón de Carrito */}
                <button 
                    className="producto__btn producto__btn--cart"
                    onClick={() => onAddToCart(product)} 
                >
                    <i className="fas fa-shopping-cart"></i>
                </button>
                
                {/* ✅ USO CONSISTENTE: Se usa el componente InfoButton */}
                <InfoButton productId={id} /> 
                
            </div>
        </article>
    );
};

export default ProductCard;