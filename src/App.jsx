import Header from './components/Header';
import Footer from './components/Footer';
import useFetch from '../useFetch';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import SearchContext from "./contexts/SearchContext";
import { useNavigate } from "react-router-dom";

function App() {
  const { data, loading, error } = useFetch('https://major-project1-backend-jet.vercel.app/books');

  const { searchTerm } = useContext(SearchContext);
  const navigate = useNavigate();

  const search = searchTerm?.toLowerCase() || "";

  const filtered = data?.filter((d) =>
    d.bookAuthor.toLowerCase().includes(search) ||
    d.bookName.toLowerCase().includes(search)
  );

  const handleGenreClick = (genre) => {
    navigate(`/allbooks?genre=${genre}`);
  };

  return (
    <>
      <Header />

      <div className='container'>

        {loading && <p className="mt-4 mx-4 h4">Loading...</p>}

        {error && <p>An error occurred while fetching the books.</p>}

        {!loading && !error && filtered && filtered.length === 0 && (
          <p>No book found.</p>
        )}

        {!loading && !error && filtered && filtered.length > 0 && (
          <div className='row justify-content-center'>
            {filtered.slice(0, 5).map((d) => (
              <div className='col-6 col-sm-4 col-md-2 my-4' key={d._id}>
                <div
                  className='book-card text-center h-100 d-flex flex-column'
                  style={{
                    borderRadius: '8px',
                    padding: '8px',
                    backgroundColor: '#fff'
                  }}
                >
                  <div
                    style={{
                      height: "300px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      overflow: "hidden"
                    }}
                  >
                    <img
                      onClick={() => navigate(`/bookName/${d.bookName}`)}
                      src={d.bookImage}
                      alt={d.bookName}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        cursor: "pointer"
                      }}
                    />
                  </div>

                  <div className='card-body d-flex flex-column mt-2' style={{ flex: 1 }}>
                    <p className='lead mb-1'>{d.bookAuthor}</p>
                    <p className='small mb-0'>Rating: ⭐ {d.bookRating}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className='d-flex flex-wrap justify-content-center mt-3 gap-2'>
          <Link to="/allbooks" className='btn btn-warning' style={{ minWidth:"140px" }}>All Books</Link>
          <button className='btn btn-primary' onClick={() => handleGenreClick("Biography")}>Biography</button>
          <button className='btn btn-secondary' onClick={() => handleGenreClick("Children")}>Children</button>
          <button className='btn btn-success' onClick={() => handleGenreClick("Fantasy")}>Fantasy</button>
          <button className='btn btn-danger' onClick={() => handleGenreClick("Fiction")}>Fiction</button>
          <button className='btn btn-primary' onClick={() => handleGenreClick("History")}>History</button>
          <button className='btn btn-info' onClick={() => handleGenreClick("Mystery")}>Mystery</button>
          <button className='btn btn-success' onClick={() => handleGenreClick("Non-Fiction")}>Non-Fiction</button>
          <button className='btn btn-secondary' onClick={() => handleGenreClick("Romance")}>Romance</button>
          <button className='btn btn-primary' onClick={() => handleGenreClick("Science Fiction")}>Science Fiction</button>
          <button className='btn btn-info' onClick={() => handleGenreClick("Thriller")}>Thriller</button>
        </div>
      </div>

      <div className='bg-secondary-subtle text-center mt-4 py-5'>
        <div className='container px-3'>
          <h1>All eBooks are free here</h1>
          <p className='display-6'>
            Explore a wide collection of free ebooks designed for every reader.
            From exciting stories to helpful guides, our platform makes reading simple, fast, and enjoyable.
            Find your next favorite book, start reading instantly, and enjoy a smooth, hassle-free experience — anytime, anywhere.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
