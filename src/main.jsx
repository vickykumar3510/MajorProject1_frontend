import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import CartPage from './pages/Cartpage.jsx';
import WishList from './pages/WishList.jsx';
import HeaderNoProfile from './components/HeaderNoProfile.jsx';
import AllBooks from './pages/AllBooks.jsx';
import { SearchProvider } from './contexts/SearchContext';
import { CartProvider } from './contexts/CartContext.jsx';
import { WishListProvider } from './contexts/WishListContext.jsx';
import BookDetails from './pages/BookDetails.jsx';
import NoProfileNoSearchBarHeader from './components/NoProfileNoSearchBarHeader.jsx';
import UserProfile from './pages/UserProfile.jsx';
import { AddressProvider } from './contexts/AddressContext.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import HeaderNoSearchBar from './components/HeaderNoSearchBar.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/cartpage",
    element: <CartPage/>
  },
  {
    path: "/wishlist",
    element: <WishList/>
  },
  {
    path: "/headernoprofile",
    element: <HeaderNoProfile/>
  },
  {
    path: "/allbooks",
    element: <AllBooks/>
  },
  {
    path: "/bookName/:name",
    element: <BookDetails/>
  },
  {
    path :"/noprofilenosearchbarheader",
    element: <NoProfileNoSearchBarHeader/>
  },
  {
    path: "/userprofile",
    element: <UserProfile/>
  },
  {
    path: "/checkoutpage",
    element: <CheckoutPage/>
  },
  {
    path: "/headernosearchbar",
    element: <HeaderNoSearchBar/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchProvider>
      <CartProvider>
        <WishListProvider>
          <AddressProvider>
    <RouterProvider router={router}  />
    </AddressProvider>
    </WishListProvider>
    </CartProvider>
    </SearchProvider>
  </StrictMode>,
)
