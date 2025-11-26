import { useContext, useState, useEffect } from "react";
import SearchContext from "../contexts/SearchContext";
import useFetch from "../../useFetch";
import Header from '../components/Header';
import Footer from "../components/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import CartContext from "../contexts/CartContext";
import WishlistContext from "../contexts/WishListContext";

const AllBooks = () => {
  const { data, loading, error } = useFetch(
    "https://major-project1-backend-jet.vercel.app/books"
  );
  const { searchTerm } = useContext(SearchContext);
  const { cartMessage, addToCart, cart, increaseQty, decreaseQty } =
    useContext(CartContext);
  const { wishlistMsg, addToWishlist } = useContext(WishlistContext);

  const [priceSort, setPriceSort] = useState("none");
  const [genreFilter, setGenreFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState(["all"]);

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const genreFromURL = params.get("genre");

  useEffect(() => {
    if (genreFromURL) setGenreFilter(genreFromURL);
  }, [genreFromURL]);

  const search = searchTerm?.toLowerCase() || "";

  const handleGenre = (e) => setGenreFilter(e.target.value);

  const handleRatingChange = (value) => {
    if (value === "all") setRatingFilter(["all"]);
    else setRatingFilter([value]);
  };

  const filtered = data?.filter((book) => {
    const name = book.bookName?.toLowerCase() || "";
    const author = book.bookAuthor?.toLowerCase() || "";
    const genres =
      book.bookGenre?.map((g) => g.toLowerCase()).join(" ") || "";
    const rating = book.bookRating || 0;

    const searchMatch =
      name.includes(search) ||
      author.includes(search) ||
      genres.includes(search);

    let ratingMatch = true;
    if (!ratingFilter.includes("all")) {
      ratingMatch = ratingFilter.some((range) => {
        if (range === "above9") return rating > 9;
        if (range === "above7") return rating > 7;
        if (range === "below7") return rating <= 7;
        return true;
      });
    }

    const genreMatch =
      genreFilter === "all" ||
      book.bookGenre?.some(
        (g) => g.toLowerCase() === genreFilter.toLowerCase()
      );

    return searchMatch && ratingMatch && genreMatch;
  });

  let finalBooks = filtered ? [...filtered] : [];
  if (priceSort === "low") finalBooks.sort((a, b) => a.bookPrice - b.bookPrice);
  else if (priceSort === "high")
    finalBooks.sort((a, b) => b.bookPrice - a.bookPrice);

  const clearFilters = () => {
    setPriceSort("none");
    setRatingFilter(["all"]);
    setGenreFilter("all");
    navigate("/allbooks");
  };

  return (
    <main>
      <Header />
      <div className="container mt-3">
        <h2>Showing All Books:</h2>
        <p>Total Books: {finalBooks?.length || 0}</p>

        {cartMessage && (
          <p className="alert alert-success text-center">{cartMessage}</p>
        )}
        {wishlistMsg && (
          <p className="alert alert-warning text-center">{wishlistMsg}</p>
        )}

        <div className="row mt-4">
        
          <div className="col-12 col-lg-9 mb-4">
            {loading && <p className="mt-4 mx-4 h4">Loading...</p>}
            {error && <p>Error while loading...</p>}

            {!loading && !error && finalBooks && finalBooks.length === 0 && (
              <p>No books found.</p>
            )}

            {!loading && !error && finalBooks && finalBooks.length > 0 && (
              <div className="row">
                {finalBooks.map((d) => {
                  const inCart = cart.find((c) => c.bookName === d.bookName);

                  return (
                    <div className="col-12 col-sm-6 col-md-4 my-3" key={d._id}>
                      <div className="h-100 text-center pt-4">
                        <img
                          src={d.bookImage}
                          alt={d.bookName}
                          style={{
                            height: "220px",
                            width: "100%",
                            objectFit: "contain",
                            cursor: "pointer",
                          }}
                          onClick={() => navigate(`/bookName/${d.bookName}`)}
                        />

                        <div className="d-flex flex-column mt-2">
                          <div
                            style={{ height: "40px" }}
                            className="text-truncate"
                          >
                            <h5 className="m-0">{d.bookName}</h5>
                          </div>

                          <p className="lead mb-1">{d.bookAuthor}</p>
                          <small>Rating: ⭐ {d.bookRating}</small>
                          <h5>Rs. {d.bookPrice}</h5>

                          {inCart ? (
                            <div className="d-flex justify-content-center align-items-center mt-2">
                              <button
                                className="btn btn-secondary"
                                onClick={() => decreaseQty(d.bookName)}
                              >
                                -
                              </button>
                              <span className="mx-2 fs-5">
                                {inCart.quantity}
                              </span>
                              <button
                                className="btn btn-secondary"
                                onClick={() => increaseQty(d.bookName)}
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              className="btn btn-warning mt-2"
                              onClick={() => addToCart(d)}
                            >
                              Add to Cart
                            </button>
                          )}

                          <button
                            className="btn btn-outline-danger mt-2"
                            onClick={() => addToWishlist(d)}
                          >
                            Add to Wishlist
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        
          <div className="col-12 col-lg-3">
            <div className="border rounded p-3">
              <button
                onClick={clearFilters}
                className="btn btn-sm btn-dark mb-2"
              >
                Clear All Filters
              </button>

              <hr />
              <strong>Sort by:</strong>
              <br />
              <input
                type="radio"
                onChange={() => setPriceSort("low")}
                checked={priceSort === "low"}
              />{" "}
              Low to High
              <br />
              <input
                type="radio"
                onChange={() => setPriceSort("high")}
                checked={priceSort === "high"}
              />{" "}
              High to Low

              <hr />
              <strong>Rating:</strong>
              <br />
              <input
                type="checkbox"
                onChange={() => handleRatingChange("all")}
                checked={ratingFilter.includes("all")}
              />{" "}
              All Ratings
              <br />
              <input
                type="checkbox"
                onChange={() => handleRatingChange("above9")}
                checked={ratingFilter.includes("above9")}
              />{" "}
              Above 9
              <br />
              <input
                type="checkbox"
                onChange={() => handleRatingChange("above7")}
                checked={ratingFilter.includes("above7")}
              />{" "}
              Above 7
              <br />
              <input
                type="checkbox"
                onChange={() => handleRatingChange("below7")}
                checked={ratingFilter.includes("below7")}
              />{" "}
              7 and Below

              <hr />
              <strong>Filter by Genre:</strong>
              <select
                value={genreFilter}
                onChange={handleGenre}
                className="form-control mt-2"
              >
                <option value="all">All</option>
                <option value="Biography">Biography</option>
                <option value="Children">Children</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Fiction">Fiction</option>
                <option value="History">History</option>
                <option value="Mystery">Mystery</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Romance">Romance</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Thriller">Thriller</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default AllBooks;
