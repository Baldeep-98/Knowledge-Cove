import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function BookFilter({ onGenreChange }) {
  const navigate = useNavigate();
  const location = useLocation();

  const onChangeStatus = (e) => {
    const { value: genre } = e.target;
    onGenreChange(genre);  
    navigate({
      pathname: location.pathname === '/books' ? '/books' : location.pathname,
      search: genre ? `?genre=${genre}` : ''
    });
  };

  return (
    <div>
      <select onChange={onChangeStatus}>
        <option value="all">All </option>
        <option value="fiction">Fiction</option>
        <option value="romance">Romance</option>
        <option value="biography">Biography</option>
        <option value="mystery">Mystery</option>
        <option value="thriller">Thriller</option>
        <option value="self-help">Self Help</option>
        <option value="fantasy">Fantasy</option>
      </select>
    </div>
  );
}

export default BookFilter;
