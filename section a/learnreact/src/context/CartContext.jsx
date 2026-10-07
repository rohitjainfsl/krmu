import { createContext, useState, useContext } from "react";

// STEP 1: Create the Context
export const CartContext = createContext();

// STEP 2: Create the Provider Component
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Function to add a product to the cart (Updates local state & sends API POST request)
  const addToCart = async (product, attributes = { color: "red", size: "M" }) => {
    const productId = product._id || product.id;
    if (!productId) return;

    const productTitle = product.name || product.title || "Product";
    const productImage = product.url || product.image || "";
    const productPrice = product.price || 0;

    // 1. Instant local UI state update
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prevCart,
        {
          id: productId,
          title: productTitle,
          image: productImage,
          price: productPrice,
          quantity: 1,
          attributes,
        },
      ];
    });

    // 2. Post data to backend API according to format:
    // [POST]: /api/cart/add
    try {
      await fetch("https://ecommerce-api-8ga2.onrender.com/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: productId,
          quantity: 1,
          attributes: attributes,
        }),
      });
    } catch (error) {
      console.error("Failed to sync cart item with API:", error);
    }
  };

  // Function to remove a product from the cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Function to clear the cart
  const clearCart = () => setCart([]);

  // Compute total count of items in cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
}

// STEP 3: Custom Hook for consuming Cart Context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
