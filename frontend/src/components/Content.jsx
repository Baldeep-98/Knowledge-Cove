import React from "react";
import { Route, Routes } from 'react-router-dom';
import CatalogPage from './Catalogue.jsx';
import ServicesPage from "./Services";
import Home from "./Home.jsx";
import Login from './Login';
import Signup from './Signup';

const NotFound = () => <h1>Page Not Found</h1>;

function Content() {
  return (
    <Routes>
      <Route exact path="/Home" element={<Home />} />
      <Route path="/catalogue" element={<CatalogPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Content;
