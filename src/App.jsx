// src/App.jsx

import React, { useState, useEffect, useCallback } from 'react'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// === 1. Importaciones ===

import { rawData as initialProducts } from "./Data/products.jsx";

// Componentes
import Header from './componentes/Header.jsx';
import SearchBar from './componentes/Searchbar.jsx';
import Filters from './componentes/Filters.jsx';
import Catalog from './componentes/Catalog.jsx';
import CartModal from './componentes/CartModal.jsx';
import Toast from './componentes/Toast.jsx';

// Importación de los nuevos componentes de RUTA
import ProductDetail from './componentes/ProductDetail.jsx';
import WishlistPage from './componentes/WishlistPage.jsx'; 
import ScrollTopButton from "./componentes/ScrollTopButton";

import useWishlist from './Hooks/useWishlist.js'; 


// =========================================================
function App() {
    
    // Lista de productos actualmente visibles (para el catálogo filtrado)
    const [products, setProducts] = useState([]); 
    
    // Carrito: Array de objetos { id: 1, qty: 2 }
    const [cart, setCart] = useState([]); 

    // Estado para la UI: Modal y Toast
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState(null); 
    
    
    // === 2. UI Helpers (Toast y Carrito Modal) ===
    
    const showToast = useCallback((message) => { 
        setToastMessage(message);
        setTimeout(() => {
            setToastMessage(null);
        }, 3000);
    }, []); 
    

    // === 3. LLAMADA AL CUSTOM HOOK ===
    const { wishlist, toggleWishlist, isFavorite } = useWishlist(showToast); 
    
    
    // === 4. EFECTO DE MONTAJE ===
    
    useEffect(() => {
        // Simulación de carga de datos 
        const fetchProducts = new Promise((resolve) => {
            setTimeout(() => {
                resolve(initialProducts);
            }, 500); 
        });

        fetchProducts.then(data => {
            setProducts(data); // Inicializa el catálogo visible
        });
    }, []); 

    // === 5. LÓGICA DEL CARRITO ===
    
    const addToCart = useCallback((product) => { 
        const id = product.id;

        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === id);

            if (existingItem) {
                return prevCart.map(item =>
                    item.id === id ? { ...item, qty: item.qty + 1 } : item
                );
            } else {
                return [...prevCart, { id: id, qty: 1 }];
            }
        });
        showToast(`"${product.name}" añadido al carrito`);
    }, [showToast]); 

    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
        showToast('Producto eliminado del carrito');
    };

    const checkout = () => {
        if (cart.length === 0) {
            showToast('¡Tu carrito está vacío!');
            return;
        }
        showToast('¡Gracias por tu pedido! Compra finalizada.');
        setCart([]); 
        setIsCartOpen(false); 
    };

    const toggleCart = () => {
        setIsCartOpen(prev => !prev);
    };
    
    // === 6. LÓGICA DE FILTROS Y BÚSQUEDA ===

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


    // === 7. RENDERIZADO PRINCIPAL ===
    
    return (
        <BrowserRouter> 
            <Header 
                cartCount={cart.length} 
                favCount={wishlist.size} // <- Del Custom Hook
                toggleCart={toggleCart} 
            />

            <CartModal 
                isOpen={isCartOpen} 
                toggleCart={toggleCart}
                cart={cart}
                removeFromCart={removeFromCart}
                checkout={checkout}
                allProducts={initialProducts} 
            />

            <Toast message={toastMessage} />


            <main>
                <Routes> 
                    
                    {/* RUTA 1: Catálogo principal (Home: /) */}
                    <Route 
                        path="/" 
                        element={
                            <>
                                <SearchBar onSearch={handleSearch} />
                                <Filters onFilter={handleFilter} />
                                <Catalog 
                                    products={products} 
                                    toggleWishlist={toggleWishlist} // <- Del Custom Hook
                                    addToCart={addToCart} 
                                    isFavorite={isFavorite} // <- Del Custom Hook
                                />
                            </>
                        } 
                    />

                    {/* RUTA 2: Página de Favoritos (/favoritos) */}
                    <Route 
                        path="/favoritos" 
                        element={<WishlistPage 
                            products={initialProducts} // ✅ CORREGIDO: Usamos initialProducts
                            wishlist={wishlist} // <- Del Custom Hook
                            toggleWishlist={toggleWishlist} // <- Del Custom Hook
                            isFavorite={isFavorite} // <- Del Custom Hook
                            onAddToCart={addToCart} 
                        />} 
                    />
                    
                    {/* RUTA 3: Detalle de Producto (/producto/:productId) */}
                    <Route 
                        path="/producto/:productId" 
                        element={<ProductDetail 
                            products={initialProducts}
                            addToCart={addToCart}
                            toggleWishlist={toggleWishlist} // <- Del Custom Hook
                            isFavorite={isFavorite} // ✅ CORREGIDO: Usamos isFavorite
                        />} 
                    />

                    {/* RUTA 4: Error 404 (Wildcard *) */}
                    <Route path="*" element={<div style={{padding: '2rem'}}><h1>404 | Página No Encontrada</h1><p>La URL que buscaste no existe.</p></div>} />
                    
                </Routes>
            </main>
            
            {/* Scroll Buttom */}
            <ScrollTopButton/>
        </BrowserRouter>

    );
}

export default App;