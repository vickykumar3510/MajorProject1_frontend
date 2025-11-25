import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../contexts/CartContext";
import WishlistContext from "../contexts/WishListContext";

const NoProfileNoSearchBarHeader = () => {
  const { wishlist } = useContext(WishlistContext);
  const { cart } = useContext(CartContext);

  return (
    <header className="bg-info p-2">
      <div className="container">
        <div className="row align-items-center">

        <div className="col-12 col-md-3">
        <Link to="/" className="d-inline-block fw-bold text-dark text-decoration-none" style={{fontSize: "1.50rem"}}>
          📖 <strong>BookWala</strong>
        </Link>
        </div>
        <div className="col-12 col-md-6 my-2 my-md-0"></div>

        <div className="col-12 col-md-3 d-flex justify-content-md-end gap-2">
          <Link to="/wishlist" className="btn btn-light btn-sm">
            Wish List ({wishlist.length})
          </Link>
          <Link to="/cartpage" className="btn btn-light btn-sm">
            Cart ({cart.length})
          </Link>
        </div>
      </div>
</div>
    </header>
  );
};

export default NoProfileNoSearchBarHeader;
