import { Link } from "react-router-dom";

const HeaderNoSearchBar = () => {
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
          <Link to="/userprofile" className="btn btn-light btn-sm">Profile</Link>
          <Link to="/wishlist" className="btn btn-light btn-sm">Wish List</Link>
          <Link to="/cartpage" className="btn btn-light btn-sm">Cart</Link>
        </div>
      </div>
      </div>
    </header>
  );
};

export default HeaderNoSearchBar;
