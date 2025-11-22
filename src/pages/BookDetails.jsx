import NoLoginNoSearchBarHeader from "../components/NoLoginNoSearchBarHeader";
import Footer from "../components/Footer";
import useFetch from "../../useFetch";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../contexts/CartContext";
import WishlistContext from "../contexts/WishListContext";

const BookDetails = () => {
  const { name } = useParams();
  const { data, loading, error } = useFetch(
    `https://major-project1-backend-jet.vercel.app/books/bookName/${name}`
  );

  const { cartMessage, cart, addToCart, increaseQty, decreaseQty } =
    useContext(CartContext);

  const { wishlistMsg, addToWishlist } = useContext(WishlistContext);

  return (
    <main>
      <NoLoginNoSearchBarHeader />

      <div className="container-fluid">
        <div className="container my-4">

          {loading && <p>Loading...</p>}
          {error && <p>Error while fetching the data.</p>}

          {cartMessage && (
            <p className="alert alert-success text-center">{cartMessage}</p>
          )}

          {wishlistMsg && (
            <p className="alert alert-warning text-center">{wishlistMsg}</p>
          )}

          {data && data.length > 0 ? (
            <div className="row justify-content-center">
              {data.map((d) => {
                const inCart = cart.find((c) => c.bookName === d.bookName);

                return (
                  <div className="col-12 col-md-10 col-lg-8" key={d.bookName}>
                    <h1 className="text-center text-md-start">{d.bookName}</h1>
                    <p className="text-center text-md-start">by {d.bookAuthor}</p>

        
                    <div className="text-center">
                      <img
                        src={d.bookImage}
                        alt={d.bookName}
                        className="img-fluid"
                        style={{
                          width: "250px",
                          maxWidth: "100%",
                          borderRadius: "10px",
                        }}
                      />
                    </div>

                    <div className="mt-3 text-center text-md-start">
                      <h3>Rs. {d.bookPrice}</h3>
                      <p>Rating: ⭐ {d.bookRating}</p>
                      <p>Genre: {d.bookGenre.join(", ")}</p>
                    </div>

   
                    <div className="d-flex flex-wrap gap-2 mt-3 justify-content-center justify-content-md-start">

       
                      {inCart ? (
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-secondary"
                            onClick={() => decreaseQty(d.bookName)}
                          >
                            -
                          </button>

                          <span className="mx-3 fs-5">{inCart.quantity}</span>

                          <button
                            className="btn btn-secondary"
                            onClick={() => increaseQty(d.bookName)}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(d)}
                          className="btn btn-warning"
                        >
                          Add to Cart
                        </button>
                      )}

                      <button className="btn btn-primary">
                        Buy Now
                      </button>


                      <button
                        onClick={() => addToWishlist(d)}
                        className="btn btn-outline-danger"
                      >
                        Add to Wishlist
                      </button>
                    </div>

                    <hr />

                    <h4>Description</h4>
                    <p style={{ textAlign: "justify" }}>{d.bookDescription}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>No Book Found.</p>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default BookDetails;
