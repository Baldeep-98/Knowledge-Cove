import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import signup_banner from '../assets/images/signup_banner.png';
import { useMutation, gql} from '@apollo/client';
import toast, { Toaster } from 'react-hot-toast';


const ADD_USER = gql`
        mutation userAdd($user_var: UserInputs!) {
        userAdd(user: $user_var) {
        user_id
    }
}`;

function Signup() {

    const [user, setUser] = useState({
        name: "",
        phone: "",
        address: "",
        dob: "",
        email: "",
        password: "",
        cnfPassword: ""
    });

    const [addUser] = useMutation(ADD_USER, {
        onCompleted: () => {
            toast.success("User Registered Successfully!");
        },
        onError: () => {
            toast.error("User Registration Failed!");
        }
    });   

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleAddButtonClick = async (event) => {

        event.preventDefault();
        const newUser= {
            ...user
        };

        console.log(newUser);

        try {
            await addUser({ variables: { user_var: newUser } });
            setUser({
                name: "",
                phone: "",
                address: "",
                dob: "",
                email: "",
                password: "",
                cnfPassword: ""
            });
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };
    


    return (
        <div className='signup-container'>
            <Toaster/>
            <div className='signup-section1'>
                <img src={signup_banner} alt="signup banner" />
            </div>

            <div className='signup-section2'>
                <h2>Sign Up</h2>
                <form onSubmit={handleAddButtonClick}>
                    <div className='signup-form-section1'>
                        <span>
                            <label>Full Name:</label>
                            <input
                                type="text"
                                onChange={handleChange}
                                name="name"
                                value={user.name}
                                required
                            />
                        </span>
                        <span>
                            <label>Phone:</label>
                            <input
                                type="number"
                                onChange={handleChange}
                                name="phone"
                                value={user.phone}
                                required
                            />
                        </span>
                    </div>

                    <label>Address:</label>
                    <textarea name='address' onChange={handleChange} value={user.address} required></textarea>
                    
                    <div className='signup-form-section1'>
                        <span>
                            <label>Date of Birth:</label>
                            <input
                                type="date"
                                onChange={handleChange}
                                name="dob"
                                value={user.dob}
                                required
                            />
                        </span>

                        <span>
                            <label>Email:</label>
                            <input
                                type="email"
                                onChange={handleChange}
                                name="email"
                                value={user.email}
                                required
                            />
                        </span>
                    </div>

                    <label>Password:</label>
                    <input
                                type="password"
                                onChange={handleChange}
                                name="password"
                                value={user.password}
                                required
                            />

                    <label>Confirm Password:</label>
                    <input
                                type="password"
                                onChange={handleChange}
                                name="cnfPassword"
                                value={user.cnfPassword}
                                required
                            />

                    <button type='submit' >
                        Register
                    </button>
                </form>
                <p>Already have an account? <Link to="/Login">Log in</Link></p>
                <Outlet />
            </div>
        </div>
    )
}

export default Signup