'use client';
const { createContext, useState, useContext, useEffect } = require("react");

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const storedCart = localStorage.getItem("cartItems");
        console.log(storedCart);
        
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    // Add product to cart
    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item._id === product._id);
            if (existing) {
                return prev.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    // Remove product from cart
    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item._id !== productId));
    };

    // Clear all cart items
    const clearCart = () => {
        setCartItems([]);
    };

    // Update quantity of a product
    const updateQuantity = (productId, quantity) => {
        setCartItems(prev =>
            prev.map(item =>
                item._id === productId ? { ...item, quantity } : item
            )
        );
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            setCartItems,
            addToCart,
            removeFromCart,
            clearCart,
            updateQuantity,
        }}>
            {children}
        </CartContext.Provider>
    );
}

const UseCartContext = () => useContext(CartContext);

export default UseCartContext;