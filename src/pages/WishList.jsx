import HeaderNoSearchBar from "../components/HeaderNoSearchBar";
import Footer from "../components/Footer";
import { useContext, useEffect } from "react";
import WishlistContext from "../contexts/WishListContext";
import CartContext from "../contexts/CartContext";
import SearchContext from "../contexts/SearchContext";
import { useNavigate } from "react-router-dom";

const WishList = () => {
  const { wishlist, removeFromWishlist, setWishlist } = useContext(WishlistContext);
  const { cart, addToCart, increaseQty, decreaseQty, setCart } = useContext(CartContext);
  const { searchTerm } = useContext(SearchContext);
  const { cartMessage } = useContext(CartContext);
  const { wishlistMsg } = useContext(WishlistContext);
  const navigate = useNavigate();

  const search = searchTerm?.toLowerCase() || "";

  const filteredWishlist = wishlist.filter(
    (b) =>
      b.bookName.toLowerCase().includes(search) ||
      b.bookAuthor.toLowerCase().includes(search)
  );

  const getCartItem = (name) => cart.find((item) => item.bookName === name);

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    const savedCart = localStorage.getItem("cart");

    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch {}
    }

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <main>
      <HeaderNoSearchBar />

      <div className="container-fluid">
        <div className="container">
          <p className="mt-4">
            <strong>Total Wishlist Items:</strong> {filteredWishlist.length}
          </p>

          {cartMessage && <p className="alert alert-success text-center">{cartMessage}</p>}
          {wishlistMsg && <p className="alert alert-warning text-center">{wishlistMsg}</p>}

          <div className="row mt-3">
            {filteredWishlist.map((book) => {
              const cartItem = getCartItem(book.bookName);

              return (
                <div className="col-12 col-sm-6 col-md-4 mb-4" key={book.bookName}>
                  <div className="card p-3 h-100 text-center">

                    <img
                      src={book.bookImage}
                      alt={book.bookName}
                      className="book-cover mb-3"
                      style={{ objectFit: "contain", height: "220px", width: "100%", cursor: "pointer" }}
                      onClick={() => navigate(`/bookName/${book.bookName}`)}
                    />

                    <h5 className="mt-2">{book.bookName}</h5>
                    <p className="text-muted">{book.bookAuthor}</p>
                    <p>Rating: ⭐ {book.bookRating}</p>
                    <h4>Rs. {book.bookPrice}</h4>

                    <div className="d-flex flex-column flex-md-row justify-content-center gap-2 mt-3">

                      {!cartItem ? (
                        <button
                          onClick={() => addToCart(book)}
                          className="btn btn-warning btn-sm w-100"
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <div className="d-flex justify-content-center align-items-center gap-2 w-100">
                          <button
                            className="btn btn-secondary btn-sm px-3"
                            onClick={() => decreaseQty(book.bookName)}
                          >
                            -
                          </button>

                          <span className="fs-6">{cartItem.quantity}</span>

                          <button
                            className="btn btn-secondary btn-sm px-3"
                            onClick={() => increaseQty(book.bookName)}
                          >
                            +
                          </button>
                        </div>
                      )}

                      <button
                        className="btn btn-danger btn-sm w-100"
                        onClick={() => removeFromWishlist(book.bookName)}
                      >
                        Remove
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}

            {filteredWishlist.length === 0 && (
              <h4 className="text-center text-danger mt-5">No Wishlist Items Found.</h4>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default WishList;
