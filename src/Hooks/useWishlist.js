// src/hooks/useWishlist.js

import { useState, useCallback } from 'react';

const useWishlist = (showToast) => {
    // Estado para guardar los IDs de los productos favoritos (usando Set para eficiencia)
    const [wishlist, setWishlist] = useState(new Set()); 

    // Función principal para añadir o quitar un producto
    const toggleWishlist = useCallback((id) => {
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
            
            // Llama a la función de Toast que viene desde App.jsx
            if (showToast) { 
                showToast(message);
            }
            return newWishlist; 
        });
    }, [showToast]);

    // Función auxiliar para verificar si un ID está en la lista (necesaria para ProductDetail)
    const isFavorite = useCallback((id) => {
        return wishlist.has(id);
    }, [wishlist]);

    // El Hook devuelve el estado y las funciones que App.jsx necesita.
    return { wishlist, toggleWishlist, isFavorite };
};

export default useWishlist;