import React from 'react'
import { Outlet, Link } from 'react-router-dom';

function NavOptions(props) {

    const navOptions = [{
            id: 1,
            option: "Home",
            to: "/Home"
        },
        {
            id: 2,
            option: "About",
            to: "/About"
        },
        {
            id: 3,
            option: "Catalogues",
            to: "/Catalogues"
        },
        {
            id: 4,
            option: "Rooms",
            to: "/Rooms"
        },
        {
            id: 5,
            option: "Services",
            to: "/Services"
        },
        {
            id: 6,
            option: "Cart",
            to: "/Cart"
        }
    ];


    return (
        <>
            <ul className={props.menuStyle}>
            { navOptions.map( (l) => (
                <li
                key={l.id}
                className={props.menuItemstyle}
                >
                <Link onClick={props.clickFun} to={l.to}>{l.option}</Link>
                </li>
            ))}
            

            {props.isNavResp && (
                <li
                key="7"
                className={props.menuItemstyle}
                >
                <Link onClick={props.clickFun} to="/Login">Login</Link>
                </li>
            )}
            </ul> 
            <Outlet/>
        </>
    )
}

export default NavOptions