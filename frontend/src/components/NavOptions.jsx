import React from 'react';
import {Outlet, Link } from 'react-router-dom';

function NavOptions(props) {
  const navOptions = [
    { id: 1, option: "Home", path: "/" },
    { id: 2, option: "About" },
    { id: 3, option: "Catalogues", path: "/catalogue" },
    { id: 4, option: "Rooms" },
    { id: 5, option: "Services", path: "/services" },
    { id: 6, option: "Cart" }
  ];

  return (
    <ul className={props.menuStyle}>
      {navOptions.map((l) => (
        <li key={l.id} className={props.menuItemstyle}>
          {l.path ? (
            <Link to={l.path}>{l.option}</Link>
          ) : (
            l.option
          )}
        </li>
      ))}
      {props.resp && (
        <li key="login" className={props.menuItemstyle}>
          <Link to="/login">Login</Link>
        </li>
      )}
    </ul>
  );
}

export default NavOptions;
