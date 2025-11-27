import { createContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const WishListProvider = ({ children }) => {
  
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistMsg, setWishlistMsg] = useState("");

  
  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);


  useEffect(() => {
    if (!wishlistMsg) return;
    const t = setTimeout(() => setWishlistMsg(""), 1500);
    return () => clearTimeout(t);
  }, [wishlistMsg]);

  const addToWishlist = (book) => {
    setWishlist((prev) => {
      const existing = prev.find((b) => b.bookName === book.bookName);

      if (existing) {
        setWishlistMsg(`"${book.bookName}" is already in Wishlist.`);
        return prev;
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
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, wishlistMsg, setWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;
