import { createContext, useContext, useEffect, useState } from "react";
import API_URL from "../services/api";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Get JWT token
  const getToken = () => {
    return localStorage.getItem("token");
  };

  // Convert backend cart format to frontend format
  const formatCartItems = (products) => {
    return products.map((item) => ({
      id: item.product._id,
      title: item.product.name,
      price: item.product.price,
      description: item.product.description,
      stock: item.product.stock,
      image: item.product.image,
      category: item.product.category?.name || "",
      quantity: item.quantity,
    }));
  };

  // Get cart from backend
  const fetchCart = async () => {
    const token = getToken();

    if (!token) {
      setCartItems([]);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setCartItems(formatCartItems(data.cart.products));
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  // Load cart when user logs in
  useEffect(() => {
    fetchCart();
  }, []);

  // Add product
 const addToCart = async (product, quantity = 1) => {
  const token = getToken();

  if (!token) {
    alert("Please login to add products to cart.");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: product.id,
        quantity,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      alert(data.message || "Unable to add product.");
      return;
    }

    await fetchCart();
  } catch (error) {
    console.error("Add to cart error:", error);
  }
};

  // Remove product
 const removeFromCart = async (id) => {
  const token = getToken();

  if (!token) return;

  try {
    const response = await fetch(`${API_URL}/api/cart/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.success) {
      await fetchCart();
    }
  } catch (error) {
    console.error("Remove from cart error:", error);
  }
};

  // Increase quantity
  const increaseQuantity = async (id) => {
    const item = cartItems.find((item) => item.id === id);

    if (!item) return;

    await updateQuantity(id, item.quantity + 1);
  };

  // Decrease quantity
  const decreaseQuantity = async (id) => {
    const item = cartItems.find((item) => item.id === id);

    if (!item || item.quantity <= 1) return;

    await updateQuantity(id, item.quantity - 1);
  };

  // Update quantity
 const updateQuantity = async (id, quantity) => {
  const token = getToken();

  if (!token) return;

  try {
    const response = await fetch(`${API_URL}/api/cart/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        quantity,
      }),
    });

    const data = await response.json();

    if (data.success) {
      await fetchCart();
    }
  } catch (error) {
    console.error("Update cart error:", error);
  }
};

  // Clear cart
  const clearCart = async () => {
    const token = getToken();

    if (!token) {
      setCartItems([]);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/cart`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Clear cart error:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}