import React from 'react';
import studyRoomImg from '../assets/images/study_room.jpeg';

function Rooms() {
    return (
        <>
            <h1 className='rooms-heading'> Private Study Room Reservation </h1>
            <div className='rooms-section-1'>
                <div className='rooms-section-1-subs-1'>
                    <p>
                        <b>Seasonal Note: </b>
                        <span>
                            As finals approach, we anticipate a high demand for our private study rooms. To accommodate as many students as possible, please be mindful of the following:
                                <ul>
                                    <li>Book Early: Reserve your room well in advance.</li>
                                    <li>Fair Use: Limit bookings to essential study sessions to allow others to benefit.</li>
                                    <li>Cancellations: If you no longer need your reserved time, please cancel your booking promptly.</li>
                                </ul>
                            We wish you all the best in your studies and exams! 
                        </span>                   
                    </p>
                    <br/>
                    <p>
                        <b>Please Note: </b>
                        <span>Room Service is Only available at the main Branch that is Kitchener Downtown. </span>                   
                    </p>
                </div>
                <div className='rooms-section-1-subs-2'>
                    <img src={studyRoomImg} alt="Login banner" />
                </div>
            </div>
            
            <div className='rooms-section-2'>
                <div className='room-booking-area'>
                    <h2>Select Date and Time</h2>
                    <div className='room-booking-area-sec1'>
                        <div className='room-booking-dates selected-date'>
                            MON, JUN 10
                        </div>   
                        <div className='room-booking-dates'>
                            TUE, JUN 11
                        </div>
                        <div className='room-booking-dates'>
                            WED, JUN 12
                        </div> 
                        <div className='room-booking-dates'>
                            THU, JUN 13
                        </div> 
                        <div className='room-booking-dates'>
                            FRI, JUN 14
                        </div> 
                        <div className='room-booking-dates'>
                            SAT, JUN 15
                        </div>
                    </div>

                    <div className='vertical-line'></div>
                    <hr className='horizontal-line'/>                   

                    <div className='room-booking-area-sec2'>   
                        <div className='room-booking-time'>
                            <div className='room-booking-time-area'>
                                <p>9:30 AM - 10:30 AM</p>
                                <p>Room Available</p>
                            </div>
                            <button className='room-booking-time-btn'>Book <br/> Now</button>
                        </div>
                        <div className='room-booking-time'>
                            <div className='room-booking-time-area'>
                                <p>10:30 AM - 11:30 AM</p>
                                <p>Room Available</p>
                            </div>
                            <button className='room-booking-time-btn'>Book <br/> Now</button>
                        </div>
                        <div className='room-booking-time'>
                            <div className='room-booking-time-area'>
                                <p>11:30 AM - 12:30 PM</p>
                                <p>Room Available</p>
                            </div>
                            <button className='room-booking-time-btn'>Book <br/> Now</button>
                        </div>
                        <div className='room-booking-time'>
                            <div className='room-booking-time-area'>
                                <p>12:30 PM - 01:30 PM</p>
                                <p>Room Available</p>
                            </div>
                            <button className='room-booking-time-btn'>Book <br/> Now</button>
                        </div>
                        <div className='room-booking-time'>
                            <div className='room-booking-time-area'>
                                <p>02:30 PM - 03:30 PM</p>
                                <p>Room Available</p>
                            </div>
                            <button className='room-booking-time-btn'>Book <br/> Now</button>
                        </div>
                        <div className='room-booking-time'>
                            <div className='room-booking-time-area'>
                                <p>03:30 PM - 04:30 PM</p>
                                <p>Room Unavailable</p>
                            </div>
                            <button className='room-booking-time-btn'>All <br/> Booked</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='rooms-section-3'>
                <h3>Study Room Reservation Instructions & Policies </h3>
                <div>
                Please follow these guidelines when using our private study rooms:
                    <ul>
                        <li>Booking Limit: Each user may reserve up to 3 hours per day.</li>
                        <li>No-show Policy: Reservations will be canceled if the room is not occupied within 15 minutes of the scheduled time.</li>
                        <li>Cleanliness: Leave the room clean and tidy for the next user.</li>
                        <li>Noise Level: Keep noise to a minimum to maintain a quiet environment for everyone.</li>
                        <li>Booking Hours: 9:30 AM - 4:30 PM, Monday to Saturday <br/> Duration: 1 hours per booking</li>
                    </ul>
                Booking Rooms must be booked at least 24 hours in advance. A valid library card is required for booking. 
                </div>
            </div>
        </>
    )
}

export default Rooms