import React from 'react';
import studyRoomImg from '../assets/images/study_room.jpeg';

function Rooms() {
    return (
        <>
            <h1 className='rooms-heading'> Private Room Reservation </h1>

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

            <div className='room-section-2'>

            </div>

            <div className='room-section-3'>

            </div>
        </>
    )
}

export default Rooms