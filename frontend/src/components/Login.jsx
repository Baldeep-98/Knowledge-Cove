import React, {useState} from 'react';
import {useLazyQuery, gql} from '@apollo/client';
import { Outlet, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from '../store';
import loginBanner from '../assets/Images/login_banner.png';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isWebTokenValid } from '../webTokenVerification';

const GET_USER = gql`
    query getUser($user_cred_var: UserCredInput!){
        getUser(userCred: $user_cred_var){
            user {
                user_id
                username
                email
                membership_num
                member_plan
            }
            webToken
        }
    }
`;

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isValid = useSelector((state) => state.auth.isValid);

    const [userCred, setUserCred] = useState({
        username: "",
        password: "",
    });

    const [getUser] = useLazyQuery(GET_USER, {
        onCompleted: (data) => {
            dispatch(login(data.getUser));
            navigate('/home');
        },
        onError: (err) => {
            toast.error(err.message);
        }
    }); 

    if (isValid && isWebTokenValid()) {
        return <Navigate to="/" />;
    }

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
        } catch (error) {
            console.error("Error while login:", error);
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
