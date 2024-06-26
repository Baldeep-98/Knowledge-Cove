import React from "react";
import { Route, Routes } from 'react-router-dom';
import CatalogPage from './Catalogue.jsx';
import ServicesPage from "./Services";
import Home from "./Home.jsx";
import AllBooks from "./books.jsx";
import Login from './Login';
import Signup from './Signup';
import Rooms from './Rooms';
import About from './AboutUs'

const NotFound = () => <h1>Page Not Found</h1>;

function Content() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route exact path="/Home" element={<Home />} />
      <Route path="/catalogues" element={<CatalogPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/books" element={<AllBooks/>}/>
      <Route path="/rooms" element={<Rooms/>}/>
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Content;
