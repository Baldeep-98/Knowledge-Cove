import React from 'react'
import logo from '../assets/images/logo.png';
import fb from '../assets/images/foot_fb.svg';
import tw from '../assets/images/foot_tw.svg';
import ig from '../assets/images/foot_ig.svg';
import yt from '../assets/images/foot_yt.svg';
import call from '../assets/images/call_icon.svg';
import mail from '../assets/images/mail_icon.svg';
import loc from '../assets/images/loc_icon.svg';
import NavOptions from './NavOptions';


function footer() {
    return (
        <>
        <footer>

        <div id="sub-foot1">

            <span id="foot-logo">
                <div className='logo-section'>
                    <img className='logo' src={logo} alt="logo" />
                    <label className='logo-text'> Knowledge <br/> Cove Library</label>
                </div>
            </span>
            <p id="logo-line"><label>Knowledge Cove Library:</label> <br/> <i> "Dive into a World of Wisdom" </i></p>

            <div id="social-network-links">
                <p>Join our network:</p>
                <div>
                    <img src={fb} alt="Facebook"/>
                    <img src={ig} alt="Instagram"/>
                    <img src={tw} alt="Twitter"/>
                    <img src={yt} alt="Youtube"/>
                </div>
            </div>

        </div>

        <div id="sub-foot2">
            <h3>Quick Links</h3>
            <NavOptions />
        </div>

        <div id="sub-foot3">

            <h3>Our Speciality</h3>
            <p>"Knowledge Cove Library specializes in providing a comprehensive collection of academic and professional resources, fostering a rich environment for research and learning"</p>

        </div>

        <div id="sub-foot4">

            <h3>Visit us at:</h3>
            <p> 
                <label> <img src={loc} alt="location"/> 99 XYZ Cres Kitchener, Ontario </label>
                <label> <img src={loc} alt="location"/> 67 ABC Dr Cambridge, Ontario </label>
                <label> <img src={loc} alt="location"/> 101 UVW Avn Waterloo, Ontario </label>
            </p>
            <h3>Connect us at:</h3>
            <p> <label> <img src={call} alt="Call"/> +1 999-999-9999 </label>
            <label> <img src={mail} alt="mail"/> abc12345@kv.com </label></p>
        </div>


        <p id="copyright">Copyright &copy; 2024 <em>The Knowledge Cove</em></p>
        </footer>
        </>
    )
}

export default footer