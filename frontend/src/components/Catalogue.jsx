import React from 'react';
import { useNavigate } from 'react-router-dom';
import CatalogItem from './CatalogItem';
import '../index.css';

function CatalogPage() {
  const navigate = useNavigate();
  const books = [
    { 
      title: 'Book 1', 
      author: 'Author Name',
      sources: [
        { src: '/Images/book.jpeg', media: "(min-width: 690px)" },
        { src: '/Images/book(1).jpg', media: "(max-width: 465px)" }
      ]
    },
    { 
      title: 'Book 2', 
      author: 'Author Name',
      sources: [
        { src: '/Images/book2.jpg', media: "(min-width: 690px)" },

        { src: '/Images/book2(1).jpg', media: "(max-width: 464px)" }
      ]
    },
   {
    title:'Book 3',
    author:'Author Name',
    sources:[
      {src:'/Images/book3.jpg',media:"(min-width:690px)"},
      {src:'/Images/book3(1).jpg',media:"(min-width:465px)"}
    ]
   },
   {
    title:'Book 4',
    author:'Author Name',
    sources:[
      {src:'/Images/book4.jpg',media:"(min-width:690px)"},

      {src:'/Images/book4(2).jpg',media:"(min-width:465px)"}
    ]
   },
   {
    title:'Book 5',
    author:'Author Name',
    sources:[
      {src:'/Images/book5.jpg',media:"(min-width:690px)"},

      {src:'/Images/book5(2).jpg',media:"(min-width:465px)"}
    ]
   },
   {
    title:'Book 6',
    author:'Author Name',
    sources:[
      {src:'/Images/book6.jpg',media:"(min-width:690px)"},

      {src:'/Images/book6(2).jpg',media:"(min-width:465px)"}
    ]
   },
   {
    title:'Book 7',
    author:'Author Name',
    sources:[
      {src:'/Images/book7.jpg',media:"(min-width:690px)"},

      {src:'/Images/book7(1).jpg',media:"(min-width:465px)"}
    ]
   },
   {
    title:'Book 8',
    author:'Author Name',
    sources:[
      {src:'/Images/book8.jpg',media:"(min-width:690px)"},
      {src:'/Images/book8(1).jpg',media:"(min-width:465px)"}
    ]
   },
 
  ];

  return (
    <div>
      <h1 className="catalogue-heading">Discover Our Collection</h1>
      <h2 className="catalogue-sheading">Embark on a Literary Journey</h2>
      <div className="container">
        {books.map((book, index) => (
          <CatalogItem 
            key={index} 
            title={book.title} 
            author={book.author} 
            sources={book.sources}
          />
        ))}
      </div>
      <div className="button-container">
        <button id="cataloguebutton" onClick={() => navigate('/books')}>Explore More Books</button>
      </div>
    </div>
  );
}

export default CatalogPage;
