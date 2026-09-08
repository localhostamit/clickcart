import { createContext, useContext, useState } from "react";

const CartContext = createContext();
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (product, quantity = 1) => {
    setCartItems((items) => {
      const existingProduct = items.find(
        (item) => item.id === product.id
      );
      if (existingProduct) {
        return items.map((item) =>
          item.id === product.id
            ? {...item,quantity: item.quantity + quantity,}
            : item
        );
      }
      return [
        ...items,
        { ...product,quantity: quantity,},
      ];
    });
  };
  const removeFromCart = (id) => {
    setCartItems((items) =>
      items.filter((item) => item.id !== id)
    );
  };
  const increaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? {...item,quantity: item.quantity + 1,}
          : item
      ));
  };
  const decreaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? {...item,quantity: item.quantity - 1,}
          : item
      ));
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}