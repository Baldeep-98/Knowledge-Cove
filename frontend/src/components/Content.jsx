import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CatalogPage from './Catalogue';
import ServicesPage from './Services';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import BookDetail from './BookDetail';

const NotFound = () => <h1>Page Not Found</h1>;

function Content() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/catalogue" element={<CatalogPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/detail/:id" element={<BookDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Content;
