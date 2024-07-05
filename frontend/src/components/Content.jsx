
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CatalogPage from './Catalogue';
import ServicesPage from "./Services";
import Home from "./Home.jsx";
import Login from './Login';
import Signup from './Signup';
import Rooms from './Rooms';
import BookDetail from './BookDetail';
import AboutUs from './AboutUs.jsx'
import Admin from './Admin'
 
 
const NotFound = () => <h1>Page Not Found</h1>;
 
function Content() {
  return (
    <Routes>
 
      <Route path="/" element={<Home />} />
      <Route exact path="/Home" element={<Home />} />
      <Route path="/catalogue" element={<CatalogPage />} />
      <Route path="/services" element={<ServicesPage />} />
       <Route path="/detail/:id" element={<BookDetail />}/>
      <Route path="/rooms" element={<Rooms/>}/>
      <Route path="/AboutUs" element={<AboutUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
 
export default Content;
