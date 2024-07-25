import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import studyRoomImg from '../assets/Images/study_room.jpeg';
import RoomBookingTime from './RoomBookingTime'
import {useQuery, gql} from '@apollo/client';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isWebTokenValid } from '../webTokenVerification';


const GET_BOOKED_ROOM = gql`
        query getBookedRoomInfo($booked_room_var: BookedRoomInput!){
        getBookedRoomInfo(bookedRoom: $booked_room_var){
            room_num
            booking_date_time
            room_booked
            booked_by
    }
}`


function Rooms(props) {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState("");
    const [bookedRoomInfo, setBookedRoomInfo] = useState([]);

    const isValid = useSelector((state) => state.auth.isValid);

    const weekDays = [1, 2, 3, 4, 5, 6, 7];
    const date = new Date();

    const { refetch } = useQuery(GET_BOOKED_ROOM, {
        variables: {
            booked_room_var: {
                booking_date: selectedDate,
                booked_by: JSON.parse(localStorage.getItem("userInfo"))?.membership_num
            }
        },
        skip: !selectedDate,
        onCompleted: (data) => {
            console.log("room time info fetched Successfully!");
            setBookedRoomInfo(data.getBookedRoomInfo);
        },
        onError: (error) => {
            console.log("room time info fetch failed!", error);
        }
    });

    console.log('isWebTokenValid', isWebTokenValid())

    if (!isValid && !isWebTokenValid()) {
        return <Navigate to="/login" />;
    }

    const weekDates = weekDays.map(d => {
        let result = new Date(date);
        result.setDate(date.getDate() + d);
        return result.toString().substring(0, 10).replace(' ', ', ');
    })
    .filter(dateString => !dateString.includes("Sun"));

    const selectDate = async (k) => {
        
        setSelectedDate(k);
        let key = k.replace(', ', '-').replace(' ', '-');        
        console.log(key);
        navigate({
            pathname:'/Rooms',
            search: key ? `?date=${key}` : ''
        });
        refetch();
    };


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
                    <img src={studyRoomImg} alt="Study room" />
                </div>
            </div>
            

            <div className='rooms-section-2'>

                <div className='room-booking-area'>
                    <h2>Select Date and Time</h2>

                    <div className='room-booking-area-sec1'>
                    { 
                        weekDates.map((dates) => 
                        <button key={dates} className= {dates === selectedDate ? 'room-booking-dates selected-date': 'room-booking-dates'} onClick={(e) => selectDate(e.target.textContent)}>
                            {dates}
                        </button> ) 
                    }
                    </div>

                    <div className='vertical-line'></div>
                    <hr className='horizontal-line'/>                   

                    <div className='room-booking-area-sec2'> 
                        <RoomBookingTime dateof={selectedDate} bookedRooms = {bookedRoomInfo} />
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