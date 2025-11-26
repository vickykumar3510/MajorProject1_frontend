import { useContext } from "react";
import SearchContext from "../contexts/SearchContext";
import { Link } from "react-router-dom";
import WishlistContext from "../contexts/WishListContext";
import CartContext from "../contexts/CartContext";

const Header = () => {
  const { setSearchTerm } = useContext(SearchContext);
  const {wishlist } = useContext(WishlistContext)
  const {cart} = useContext(CartContext)

  const handleInput = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <header className="bg-info p-2">
      <div className="container">
          <div className="row align-items-center">

        <div className="col-12 col-md-3">
        <Link to="/" className="d-inline-block fw-bold text-dark text-decoration-none" style={{fontSize: "1.50rem"}}>
          📖 <strong>BookWala</strong>
        </Link>
        </div>

        <div className="col-12 col-md-6 my-2 my-md-0">
          <input
            onChange={handleInput}
            type="text"
            className="form-control"
            placeholder="Search by title, author, genre"
            
          />
        </div>

        <div className="col-12 col-md-3 d-flex justify-content-md-end gap-2">
          <Link to="/userprofile" className="btn btn-light btn-sm">Profile</Link>
          <Link to="/wishlist" className="btn btn-light btn-sm">Wish List({wishlist.length})</Link>
          <Link to="/cartpage" className="btn btn-light btn-sm">Cart({cart.length})</Link>
        </div>
      </div>
      </div>
    </header>
  );
};

export default Header;
