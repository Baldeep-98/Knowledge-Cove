import React, {useRef} from 'react';
//used react-to-print library for printing/saving library card
//reference : https://www.npmjs.com/package/react-to-print
import {useReactToPrint} from 'react-to-print'; 
import logo from '../assets/Images/logo.png';

function LibraryCard(props) {

    const libraryCardRef = useRef();
    const handleCardPrint = useReactToPrint({
            content: () => libraryCardRef.current,
        });

    return (
        <div className='library-card-container'>
            <h2>Library Card</h2>
            <div ref={libraryCardRef} className='library-card'>
                <div className='library-card-sub1'>
                    <label>
                        Knowledge <br/>
                        Cove Library
                    </label>
                    <img className='logo' src={logo} alt="logo" />
                </div>
                <div className='library-card-sub2'>
                    <label>
                        {JSON.parse(localStorage.getItem("userInfo")).user_id}
                    </label> 
                    &nbsp; | &nbsp;
                    <label>
                        {JSON.parse(localStorage.getItem("userInfo")).membership_num}
                    </label>
                </div>
            </div>
            <div className='card-print-btn'>
                        <button type="button" onClick={handleCardPrint}>Print Card</button>
                </div>
        </div>

    )
}

export default LibraryCard