// src/componentes/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';  

const ProductDetail = ({ products, addToCart, toggleWishlist, isFavorite }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = parseInt(productId, 10);
    const foundProduct = products.find(p => p.id === id);

    const timer = setTimeout(() => {
      setProduct(foundProduct || null);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [productId, products]);

  if (isLoading) {
    return (
      <div className="detail__loader" style={{ padding: '50px', textAlign: 'center' }}>
        <i className="fas fa-spinner fa-spin" style={{ marginRight: '10px' }}></i>
        Cargando detalles del producto...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="detail__error" style={{ padding: '50px', textAlign: 'center' }}>
        Producto con ID {productId} no encontrado.
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="detail__grid">
        <img src={product.img} alt={product.name} className="detail__image" />

        <div className="detail__content">
          <h1 className="detail__name">{product.name}</h1>
          <p className="detail__price">${product.price.toFixed(2)}</p>
          <p className="detail__description">{product.description}</p>
          <p className="detail__category">Categoría: {product.category}</p>

          <div className="detail__actions">
            <button
              className="detail__add-btn"
              onClick={() => addToCart(product)}
            >
              <i className="fas fa-shopping-cart"></i> Agregar al Carrito
            </button>

            <button
              className={`detail__fav-btn ${isFavorite(product.id) ? 'is-favorite' : ''}`}
              onClick={() => toggleWishlist(product.id)}
            >
              <i className="fas fa-heart"></i>
              {isFavorite(product.id) ? ' Quitar de Favoritos' : ' Añadir a Favoritos'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;