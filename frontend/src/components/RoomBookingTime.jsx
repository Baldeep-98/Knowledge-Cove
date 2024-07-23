
import React, { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import toast, { Toaster } from 'react-hot-toast';

const ADD_TIME = gql`
    mutation timeAdd($time_var: TimeSlotInputs!) {
        timeAdd(timeSlot: $time_var) {
            room_num
            booking_date_time
        }
    }
`;

function RoomBookingTime(props) {
    const { dateof: bookingDate, bookedRooms: initialBookedRooms, selectedDateProp } = props;
    const [bookedRooms, setBookedRooms] = useState(initialBookedRooms);

    const roomBookTimes = [
        {
            id: 1,
            time: "9:30 AM - 10:30 AM"
        },
        {
            id: 2,
            time: "10:30 AM - 11:30 AM"
        },
        {
            id: 3,
            time: "11:30 AM - 12:30 PM"
        },
        {
            id: 4,
            time: "12:30 PM - 01:30 PM"
        },
        {
            id: 5,
            time: "02:30 PM - 03:30 PM"
        },
        {
            id: 6,
            time: "03:30 PM - 04:30 PM"
        }
    ];

    const [addTime] = useMutation(ADD_TIME, {
        onCompleted: (data) => {
            toast.success("Time Slot Booked Successfully!");
            setBookedRooms([...bookedRooms, data.timeAdd]);
        },
        onError: () => {
            toast.error("Time Slot Booking Failed!");
        }
    });

    const addBookingTime = async (slot) => {
        const date = new Date();
        const timeSlot = {
            room_num: "1",
            booking_date_time: slot.bookingDate + " "+ date.getFullYear() +" | "+ slot.t.time,
            room_booked: true,
            booked_by: "Roman"
        };

        try {
            await addTime({ variables: { time_var: timeSlot } });
            console.log(selectedDateProp)
        } catch (error) {
            console.error("Error adding/Booking time:", error);
        }
    };

    const isRoomBooked = (time) => {
        return bookedRooms.some(room => room.booking_date_time && time === room.booking_date_time.slice(19));
    };

    useEffect(() => {
        setBookedRooms(initialBookedRooms);
    }, [initialBookedRooms]);

    return (
        <>
            <Toaster />
            {roomBookTimes.map((t) => (
                <div key={t.id} className='room-booking-time'>
                    <div className='room-booking-time-area'>
                        <p>{t.time}</p>
                        <p>
                            {isRoomBooked(t.time) ? "Room Booked" : "Room Available"}
                        </p>
                    </div>
                    {isRoomBooked(t.time)
                        ? <button className='room-booking-time-btn room-booked-btn'>Room<br/>Booked</button>
                        : <button className='room-booking-time-btn' onClick={() => bookingDate ? addBookingTime({ t, bookingDate }) : toast.error("Select Date first!")}>Book<br/>Now</button>}
                </div>
            ))}
        </>
    );
}

export default RoomBookingTime;
