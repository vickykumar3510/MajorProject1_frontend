import Header from "../components/Header";
import Footer from "../components/Footer";
import CartContext from "../contexts/CartContext";
import SearchContext from "../contexts/SearchContext";
import WishlistContext from "../contexts/WishListContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AddressContext from "../contexts/AddressContext";

const CartPage = () => {
  const { addresses, selectedAddress, setSelectedAddress } = useContext(AddressContext);

  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    totalPrice,
    setCart,
    cartMessage
  } = useContext(CartContext);

  const { searchTerm } = useContext(SearchContext);
  const { addToWishlist, wishlistMsg } = useContext(WishlistContext);

  const search = searchTerm?.toLowerCase() || "";
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/userprofile");
  };

  const filteredCart = cart.filter(
    (b) =>
      b.bookName?.toLowerCase().includes(search) ||
      b.bookAuthor?.toLowerCase().includes(search)
  );

  const totalBookQuantity = cart.reduce((sum, b) => sum + b.quantity, 0);

  const handleCheckout = () => {
    if (!cart.length) return;

    if (!selectedAddress) {
      alert("Selected address not found. Please try again.");
      return;
    }

    navigate("/checkoutpage", {
      state: {
        orderCart: cart, 
        address: selectedAddress,
        totalPrice,
        totalBookQuantity,
      },
    });
  };

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <main>
      <Header />

      <div className="container my-4">

        <p className="mt-4">
          <strong>Total Cart Items:</strong> {cart.length}
        </p>

        <div className="row mt-4 text-center">
          <div className="col-12">
            <div
              className="card p-3 shadow-sm"
              style={{
                borderRadius: "10px",
                width: "100%",
              }}
            >
              <h3 className="text-center">Cart Summary</h3>
              <hr />

              <h4>Total Books: {totalBookQuantity}</h4>
              <h4>Total Amount: Rs. {totalPrice}</h4>

              <label className="mt-3">
                <strong>Select a Delivery Address:</strong>
              </label>

              <select
                className="form-control mt-3"
                value={selectedAddress?.id || ""}
                onChange={(e) => {
                  const addr = addresses.find(
                    (a) => a.id === Number(e.target.value)
                  );
                  setSelectedAddress(addr);
                }}
              >
                <option value="">-- Select Address --</option>

                {addresses.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.nickname} — {a.city}, {a.state}
                  </option>
                ))}
              </select>

              <div className="mt-3 d-flex flex-column flex-md-row gap-2">

<button
  onClick={goToProfile}
  className="btn btn-warning w-100 w-md-auto flex-md-grow-0"
>
  Add Address
</button>

<button
  onClick={handleCheckout}
  className="btn btn-success w-100 w-md-auto flex-md-grow-0"
  disabled={cart.length === 0}
>
  Proceed to Checkout
</button>

</div>

              <div className="mt-3 text-end">
                {cart.length === 0 && (
                  <p className="text-danger px-4 w-100 w-md-auto">Cannot proceed: Cart is empty.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {cartMessage && (
          <p className="alert alert-success text-center mt-3">{cartMessage}</p>
        )}

        {wishlistMsg && (
          <p className="alert alert-warning text-center mt-3">{wishlistMsg}</p>
        )}

        <div className="row mt-4">
          {filteredCart.map((book) => (
            <div key={book.id || book.bookName} className="col-12 col-md-4 my-3">
              <div className="card p-3 text-center shadow-sm">
                <img
                  src={book.bookImage}
                  alt={book.bookName}
                  className="mx-auto"
                  style={{
                    width: "120px",
                    height: "160px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/bookName/${book.bookName}`)}
                />

                <h5 className="mt-2">{book.bookName}</h5>
                <p className="text-muted">{book.bookAuthor}</p>
                <h4>Rs. {book.bookPrice}</h4>

                <div className="d-flex justify-content-center align-items-center mt-2">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => decreaseQty(book.bookName)}
                  >
                    -
                  </button>
                  <span className="mx-3">{book.quantity}</span>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => increaseQty(book.bookName)}
                  >
                    +
                  </button>
                </div>

                <h6 className="mt-2">
                  Subtotal: Rs. {book.bookPrice * book.quantity}
                </h6>

                <div className="d-flex justify-content-between mt-3 gap-2">
                  <button
                    className="btn btn-danger w-50 me-2"
                    onClick={() => removeFromCart(book.bookName)}
                  >
                    Remove
                  </button>
                  <button
                    className="btn btn-outline-danger w-50"
                    onClick={() => addToWishlist(book)}
                  >
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default CartPage;
