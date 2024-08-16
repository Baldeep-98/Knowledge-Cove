import React from 'react'
import logo from '../assets/Images/logo.png';
import MenuIcon from '../assets/Images/menu.svg';
import CloseIcon from '../assets/Images/cross.svg';
import NavOptions from './NavOptions';
import { Outlet, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { isWebTokenValid } from '../webTokenVerification';
import { logout } from '../store';

const Navbar = () => {

  const [isNav, setIsNav] = React.useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isValid = useSelector((state) => state.auth.isValid);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const handleClick = () => {
    setIsNav(!isNav)
  };

  return (

    <nav>

      <div>
      
        <div className='logo-section margin-rg'>
          <img className='logo' src={logo} alt="logo" />
          <label className='logo-text'>K<span>.</span>C</label>
        </div>
        
        <NavOptions menuStyle='menu-options-list' menuItemstyle='menu-options-list-item' />

        <div className='login-subscribe'>

        { isValid && isWebTokenValid() ? (
          <>
            <label onClick={() => {
              dispatch(logout());
              navigate('/login');
              }}>
            <Link>Logout</Link></label>
            <Outlet/>
            
            { (isAdmin === false) &&
              <>
                &nbsp;|&nbsp;
                <label><Link to="/profile"> My Profile</Link></label>
              </>
            }

          </>
        ) : (
          <>
            <label><Link to="/Login">Login</Link></label>
            <Outlet/>
            <Link to="/Services"><button>Subscribe</button></Link>
          </>
        )}

        </div>


        
        <div onClick={() => setIsNav(!isNav)} className='menu-open-option'>
          {!isNav? <img className='menu-option' src={MenuIcon} alt="Menu open Option" />: <img className='menu-option' src={CloseIcon} alt="menu close option" />}
        </div>

        {isNav && (
          
          <NavOptions clickFun={handleClick} menuStyle='menu-list' menuItemstyle='menu-list-item' isNavResp="true" />

        )}
      </div>

    </nav>

  )
}

export default Navbar