import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();
export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const addToWishlist = (product) => {
    setWishlistItems((items) => {
      const alreadyExists = items.some(
        (item) => item.id === product.id
      );
      if (alreadyExists) {
        return items;
      }
      return [...items, product];
    });
  };
  const removeFromWishlist = (id) => {
    setWishlistItems((items) =>
      items.filter((item) => item.id !== id)
    );
  };
  const isInWishlist = (id) => {
    return wishlistItems.some(
      (item) => item.id === id
    );
  };
  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}