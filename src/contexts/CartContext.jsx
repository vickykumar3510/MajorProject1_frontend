import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartMessage, setCartMessage] = useState("");
  useEffect(() => {
  if (!cartMessage) return;

  const timer = setTimeout(() => {
    setCartMessage("");
  }, 1500);

  return () => clearTimeout(timer);
}, [cartMessage]);

  const addToCart = (book) => {
    setCart((prev) => {
      const existing = prev.find((b) => b.bookName === book.bookName);

      if (existing) {
        setCartMessage(`Increased quantity of "${book.bookName}"`);
        return prev.map((b) =>
          b.bookName === book.bookName
            ? { ...b, quantity: b.quantity + 1 }
            : b
        );
      }
      setCartMessage(`"${book.bookName}" added to cart`);

      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const increaseQty = (bookName) => {
    setCartMessage(`Increased quantity of "${bookName}"`);
    setCart((prev) =>
      prev.map((b) =>
        b.bookName === bookName ? { ...b, quantity: b.quantity + 1 } : b
      )
    );
  };

const decreaseQty = (bookName) => {
  setCart((prev) => {
    const item = prev.find((b) => b.bookName === bookName);

    if (item.quantity === 1) {
      setCartMessage(`"${bookName}" removed from cart`);
      return prev.filter((b) => b.bookName !== bookName);
    }

    setCartMessage(`Decreased quantity of "${bookName}"`);
    return prev.map((b) =>
      b.bookName === bookName
        ? { ...b, quantity: b.quantity - 1 }
        : b
    );
  });
};

  const removeFromCart = (bookName) => {
    setCartMessage(`"${bookName}" removed from cart`);
    setCart((prev) => prev.filter((b) => b.bookName !== bookName));
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.bookPrice * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        totalPrice,
        cartMessage,
        setCartMessage
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartContext;
