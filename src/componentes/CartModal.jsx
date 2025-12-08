// src/componentes/CartModal.jsx

import React from 'react';

// Recibe todas las props necesarias desde App.jsx
const CartModal = ({ isOpen, toggleCart, cart, removeFromCart, checkout, allProducts }) => {

    // === 1. Lógica para obtener la lista detallada de ítems (Paso 1) ===
    // Ya no usamos 'let totalPrice = 0;' aquí.
    
    // Mapeamos los IDs y cantidades del carrito (cart) a la información completa del producto (allProducts)
    const cartItemsDetails = cart.map(item => {
        const product = allProducts.find(p => p.id === item.id);
        
        // Manejo de caso si el producto no existe (debería existir si la lógica de App.jsx es correcta)
        const itemTotal = product ? product.price * item.qty : 0; 
        
        return {
            // Incluimos todos los detalles del producto y la cantidad/total calculado
            ...product, 
            qty: item.qty,
            itemTotal: itemTotal,
            id: item.id // Necesitamos el ID original del carrito
        };
    }).filter(item => item.name); // Filtramos ítems sin nombre (productos no encontrados)

    // === 2. Lógica para calcular el Total (Paso 2: Usando Reduce) ===
    // Calculamos el precio total a partir de la lista de ítems detallados
    const totalPrice = cartItemsDetails.reduce((sum, item) => sum + item.itemTotal, 0);

    // Clase CSS condicional para abrir/cerrar el modal
    const modalClass = `cart-modal ${isOpen ? 'cart-modal--open' : ''}`;

    return (
        <aside className={modalClass} id="cart-modal">
            {/* ... (Resto del componente JSX sin cambios) ... */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Tu Pedido</h2>
                <button 
                    onClick={toggleCart} 
                    style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
                >
                    &times;
                </button>
            </div>
            
            <div className="cart-items" id="cart-items-container">
                {cartItemsDetails.length === 0 ? (
                    <p style={{ color: '#888', textAlign: 'center', marginTop: '50px' }}>El carrito está vacío</p>
                ) : (
                    cartItemsDetails.map(item => (
                        <div key={item.id} className="cart-item">
                            <div>
                                <strong>{item.name}</strong><br />
                                <small>{item.qty} x ${item.price.toFixed(2)}</small>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontWeight: 'bold' }}>${item.itemTotal.toFixed(2)}</span>
                                <button 
                                    onClick={() => removeFromCart(item.id)} 
                                    style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            
            <div className="cart-total">
                Total: <span id="cart-total-price">${totalPrice.toFixed(2)}</span>
            </div>
            
            <button 
                className="producto__btn" 
                id="btn-checkout"
                onClick={checkout} 
                disabled={cartItemsDetails.length === 0}
            >
                Finalizar Compra
            </button>
        </aside>
    );
};

export default CartModal;