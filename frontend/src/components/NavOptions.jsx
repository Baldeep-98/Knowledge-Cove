import React from 'react'
import { Outlet, Link } from 'react-router-dom';
import { isWebTokenValid } from '../webTokenVerification';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';

function NavOptions(props) {

    const isValid = useSelector((state) => state.auth.isValid);
    const isAdmin = useSelector((state) => state.auth.isAdmin);
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
            to: "/AddBook"
        }
    ];

    if(isValid && isAdmin && isWebTokenValid())
        navOptions = adminNavOptions;
    else if(isValid && isWebTokenValid())
        navOptions = loggedInNavOptions;
    else
        navOptions = guestNavOptions;
    


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
                ( (isAdmin === false) && isValid && isWebTokenValid()) ?
                <>
                
                    { (isAdmin === false) &&
                        <li
                        key="9"
                        className={props.menuItemstyle}
                        >
                        <Link onClick={() => {
                            props.clickFun();
                        } 
                        } to="/profile" >My Profile</Link>
                        </li>
                    }

                    <li
                    key="8"
                    className={props.menuItemstyle}
                    >
                    <Link onClick={() => {
                        props.clickFun();
                        dispatch(logout());
                        navigate('/login');}
                    }>Logout</Link>
                    </li>
                </>

                : <li
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