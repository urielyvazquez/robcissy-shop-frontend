// src/App.jsx

import React, { useState, useEffect } from 'react';

// === 1. Importaciones ===

// RUTA CORREGIDA: Apunta a "data.jsx" en el mismo directorio (src/)
import { rawData as initialProducts } from "./Data/products.jsx";

// Componentes (Se asume que están en ./componentes)
import Header from './componentes/Header.jsx';
import SearchBar from './componentes/Searchbar.jsx';
import Filters from './componentes/Filters.jsx';
import Catalog from './componentes/Catalog.jsx';
import CartModal from './componentes/CartModal.jsx';
import Toast from './componentes/Toast.jsx';


// =========================================================
function App() {
    
    // === 2. ESTADO CENTRAL ===
    
    // Lista de productos actualmente visibles (para el catálogo)
    const [products, setProducts] = useState([]); 
    
    // Carrito: Array de objetos { id: 1, qty: 2 }
    const [cart, setCart] = useState([]); 

    // Favoritos: Set de IDs de productos
    const [wishlist, setWishlist] = useState(new Set()); 

    // Estado para la UI: Modal y Toast
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);

    // === 3. EFECTO DE MONTAJE (Carga de Datos Inicial) ===
    
    useEffect(() => {
        // Simulación de carga (Loader)
        const fetchProducts = new Promise((resolve) => {
            setTimeout(() => {
                resolve(initialProducts);
            }, 1500);
        });

        fetchProducts.then(data => {
            // Actualizamos el estado con los datos cargados
            setProducts(data);
        });
    }, []); 

    // === 4. LÓGICA DEL CARRITO ===

    const addToCart = (id) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === id);

            if (existingItem) {
                // Si existe, aumenta la cantidad
                return prevCart.map(item =>
                    item.id === id ? { ...item, qty: item.qty + 1 } : item
                );
            } else {
                // Si no existe, lo añade
                return [...prevCart, { id: id, qty: 1 }];
            }
        });
        showToast('Producto añadido al carrito');
    };

    const removeFromCart = (id) => {
        // Elimina el ítem completo del carrito
        setCart(prevCart => prevCart.filter(item => item.id !== id));
        showToast('Producto eliminado del carrito');
    };

    const checkout = () => {
        if (cart.length === 0) {
            showToast('¡Tu carrito está vacío!');
            return;
        }
        showToast('¡Gracias por tu pedido! Compra finalizada.');
        setCart([]); // Vacía el carrito
        setIsCartOpen(false); // Cierra el modal
    };

    // === 5. LÓGICA DE FAVORITOS ===

    const toggleWishlist = (id) => {
        setWishlist(prevWishlist => {
            const newWishlist = new Set(prevWishlist); 
            let message = '';

            if (newWishlist.has(id)) {
                newWishlist.delete(id);
                message = 'Eliminado de favoritos';
            } else {
                newWishlist.add(id);
                message = 'Añadido a favoritos';
            }
            showToast(message);
            return newWishlist; 
        });
    };

    // === 6. UI Helpers (Toast y Carrito Modal) ===

    const toggleCart = () => {
        setIsCartOpen(prev => !prev);
    };

    const showToast = (message) => {
        setToastMessage(message);
        // Oculta el toast después de 3 segundos
        setTimeout(() => {
            setToastMessage(null);
        }, 3000);
    };
    
    // === 7. LÓGICA DE FILTROS Y BÚSQUEDA ===

    const handleSearch = (searchTerm) => {
        const term = searchTerm.toLowerCase().trim();
        const filtered = initialProducts.filter(p => p.name.toLowerCase().includes(term));
        setProducts(filtered);
    };
    
    const handleFilter = (category) => {
        const filtered = category === 'all'
            ? initialProducts
            : initialProducts.filter(p => p.category === category);
        setProducts(filtered);
    };


    // === 8. RENDERIZADO PRINCIPAL ===
    
    return (
        <>
            {/* Header */}
            <Header 
                cartCount={cart.length} 
                favCount={wishlist.size} 
                toggleCart={toggleCart} 
            />

            {/* Búsqueda */}
            <SearchBar onSearch={handleSearch} />

            {/* Filtros */}
            <Filters onFilter={handleFilter} />

            <main>
                {/* Catálogo */}
                <Catalog 
                    products={products} 
                    toggleWishlist={toggleWishlist} 
                    addToCart={addToCart} 
                    wishlist={wishlist}
                />
            </main>

            {/* Modal del Carrito */}
            <CartModal 
                isOpen={isCartOpen} 
                toggleCart={toggleCart}
                cart={cart}
                removeFromCart={removeFromCart}
                checkout={checkout}
                allProducts={initialProducts} 
            />

            {/* Notificación Toast */}
            <Toast message={toastMessage} />
        </>
    );
}

export default App;