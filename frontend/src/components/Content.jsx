import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CatalogPage from './Catalogue';
import ServicesPage from "./Services";
import Home from "./Home.jsx";
import Login from './Login';
import Signup from './Signup';
import Rooms from './Rooms';
import BookDetail from './BookDetail';
import AboutUs from './AboutUs'
import Cart from './Cart';
import Checkout from './Checkout';
import AddBook from './AddBook';
import EditBook from './EditBook';
import Profile from './Profile';

const NotFound = () => <h1>Page Not Found</h1>;

function Content() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route exact path="/home" element={<Home />} />
      <Route path="/catalogue" element={<CatalogPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/detail/:id" element={<BookDetail />}/>
      <Route path="/rooms" element={<Rooms/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/addBook" element={<AddBook />} />
      <Route path="/edit/:id" element={<EditBook />} />

      <Route path="/profile" element={<Profile />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Content;
