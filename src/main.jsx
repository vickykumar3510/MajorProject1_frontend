import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import LoginPage from './pages/LoginPage.jsx';
import CartPage from './pages/Cartpage.jsx';
import WishList from './pages/WishList.jsx';
import HeaderNoLogin from './components/HeaderNoLogin.jsx';
import AllBooks from './pages/AllBooks.jsx';
import { SearchProvider } from './contexts/SearchContext';
import { CartProvider } from './contexts/CartContext.jsx';
import { WishListProvider } from './contexts/WishListContext.jsx';
import BookDetails from './pages/BookDetails.jsx';
import NoLoginNoSearchBarHeader from './components/NoLoginNoSearchBarHeader.jsx';
import UserAccount from './pages/UserAccount.jsx';
import { AddressProvider } from './contexts/AddressContext.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/loginpage",
    element: <LoginPage/>
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
    path: "/headernologin",
    element: <HeaderNoLogin/>
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
    path :"/nologinnosearchbarheader",
    element: <NoLoginNoSearchBarHeader/>
  },
  {
    path: "/useraccount",
    element: <UserAccount/>
  },
  {
    path: "/checkoutpage",
    element: <CheckoutPage/>
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
