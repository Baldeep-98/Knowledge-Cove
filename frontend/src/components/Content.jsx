import React from "react";
import { Route, Routes } from 'react-router-dom';
import CatalogPage from './Catalogue.jsx';
import ServicesPage from "./Services";
import HomePage from "./HomePage";
import AllBooks from "./books.jsx";
const NotFound = () => <h1>Page Not Found</h1>;

function Content() {
  return (
    <Routes>
      <Route exact path="/Homepage" element={<HomePage />} />
      <Route path="/catalogue" element={<CatalogPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/books" element={<AllBooks/>}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Content;
