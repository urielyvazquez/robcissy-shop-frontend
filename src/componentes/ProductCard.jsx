// src/componentes/ProductCard.jsx
import React from 'react';

// Recibe las props: el objeto 'product', las funciones y el estado 'isFav'
const ProductCard = ({ product, onToggleWishlist, onAddToCart, isFav }) => {
    // Usamos Destructuring para hacer el código más limpio
    const { id, name, price, img } = product;

    // Clase CSS condicional para el corazón de favoritos
    const favClass = `producto__fav-btn ${isFav ? 'producto__fav-btn--active' : ''}`;

    return (
        <article className="producto">
            {/* Botón de Favoritos */}
            <button 
                className={favClass}
                onClick={() => onToggleWishlist(id)} // Llama a la función con el ID
            >
                <i className="fas fa-heart"></i>
            </button>
            
            {/* Imagen */}
            <img src={img} alt={name} className="producto__imagen" />
            
            <div className="producto__contenido">
                <h3 className="producto__titulo">{name}</h3>
                
                {/* Precio */}
                <div className="producto__precio">${price.toFixed(2)}</div>
                
                {/* Botón de Carrito */}
                <button 
                    className="producto__btn"
                    onClick={() => onAddToCart(id)} // Llama a la función con el ID
                >
                    Añadir al Carrito
                </button>
            </div>
        </article>
    );
};

export default ProductCard;