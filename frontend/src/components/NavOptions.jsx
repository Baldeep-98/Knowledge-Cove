import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';

function NavOptions(props) {

    const isValid = useSelector((state) => state.auth.isValid);
    var navOptions = null;
        
    const guestNavOptions = [{
            id: 1,
            option: "Home",
            to: "/Home"
        },
        {
            id: 2,
            option: "About",
            to: "/AboutUs"
        },
        {
            id: 3,
            option: "Catalogues",
            to: "/catalogue"
        },
        {
            id: 4,
            option: "Services",
            to: "/Services"
        }
    ];

    const loggedInNavOptions = [{
        id: 1,
        option: "Home",
        to: "/Home"
    },
    {
        id: 2,
        option: "About",
        to: "/AboutUs"
    },
    {
        id: 3,
        option: "Catalogues",
        to: "/catalogue"
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

    const adminNavOptions = [{
        id: 1,
        option: "Home",
        to: "/Home"
    },
    {
        id: 2,
        option: "About",
        to: "/AboutUs"
    },
    {
        id: 3,
        option: "Catalogues",
        to: "/catalogue"
    },
    {
        id: 4,
        option: "Add Books",
        to: "/Admin"
    }
    ];

    if(isValid){
        navOptions = loggedInNavOptions;
    }
    else{
        navOptions = guestNavOptions;
    }


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