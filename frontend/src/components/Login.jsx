import React, {useState} from 'react';
import {useLazyQuery, gql} from '@apollo/client';
import { Outlet, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import loginBanner from '../assets/Images/login_banner.png';


const GET_USER = gql`
    query getUser($user_cred_var: UserCredInput!){
        getUser(userCred: $user_cred_var){
            user_id
            username
            email
            membership_num
            password
        }
    }
`;

function Login() {

    const [userCred, setUserCred] = useState({
        username: "",
        password: "",
    });

    const [getUser] = useLazyQuery(GET_USER, {
        onCompleted: () => {
            toast.success("User Login Successfully!");
        },
        onError: () => {
            toast.error("Incorrect Password or Username!");
        }
    }); 

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserCred(prevUserCred => ({
            ...prevUserCred,
            [name]: value,
        }));
    };

    const handleCheckButtonClick = async (event) => {

        event.preventDefault();
        const newUserCred= {
            ...userCred
        };

        try {
            await getUser({ variables: { user_cred_var: newUserCred } });
            setUserCred({
                username: "",
                password: "",
            });
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };


    return (
        <div className='login-container'>
        <Toaster/>
            <div className='login-section1'>
                <h2>Login</h2>
                <form onSubmit={handleCheckButtonClick}>
                    <label>Username, Email or Membership Number:</label>
                    <input
                        type="text"
                        onChange={handleChange}
                        name="username"
                        value={userCred.username}
                        required
                    />

                    <label>Password:</label>
                    <input
                        type="password"
                        onChange={handleChange}
                        name="password"
                        value={userCred.password}
                        required
                    />

                    <button type='submit' >
                        Login
                    </button>
                </form>
                <p>Don't have an account? <Link to="/Signup">Sign up</Link></p>
                <Outlet />
            </div>

            <div className='login-section2'>
                <img src={loginBanner} alt="Login banner" />
            </div>
        </div>
    );
}

export default Login;
