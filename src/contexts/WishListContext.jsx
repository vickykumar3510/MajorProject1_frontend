import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const WishlistContext = createContext();

export const WishListProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistMsg, setWishlistMsg] = useState("")

   useEffect(() => {
    if (!wishlistMsg) return;
  
    const timer = setTimeout(() => {
      setWishlistMsg("");
    }, 1500);
  
    return () => clearTimeout(timer);
  }, [wishlistMsg]);

  const addToWishlist = (book) => {
    setWishlist((prev) => {
      const existing = prev.find((b) => b.bookName === book.bookName);

      if (existing) {
         setWishlistMsg(`"${book.bookName}" is already in your Wishlist.`);
        return prev.map((b) =>
          b.bookName === book.bookName
            ? { ...b, quantity: b.quantity + 1 }
            : b
        );
      }

      setWishlistMsg(`"${book.bookName}" added to Wishlist.`);
      return [...prev, { ...book, quantity: 1 }];
    });
  };
  
  const removeFromWishlist = (bookName) => {
    setWishlistMsg(`"${bookName}" removed from Wishlist.`);
    setWishlist((prev) => prev.filter((b) => b.bookName !== bookName));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, wishlistMsg, setWishlistMsg }}>
      {children}
    </WishlistContext.Provider>
  );
};


export default WishlistContext