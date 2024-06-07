import React from 'react'
import logo from '../assets/images/logo.png';
import MenuIcon from '../assets/images/menu.svg';
import CloseIcon from '../assets/images/cross.svg';
import NavOptions from './NavOptions';
import { Outlet, Link } from 'react-router-dom';

const Navbar = () => {

  const [isNav, setIsNav] = React.useState(false)

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
          <label><Link to="/Login">Login</Link></label>
          <Outlet/>
          <Link to="/Services"><button>Subscribe</button></Link>
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