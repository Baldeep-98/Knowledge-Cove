import React from 'react'
import { useState, useEffect } from 'react';
import toast, { Toaster }  from "react-hot-toast"
import { useQuery, useMutation, gql } from "@apollo/client";
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isWebTokenValid } from '../webTokenVerification';
import LibraryCard from './LibraryCard';


const GET_USER_PROFILE = gql`
query GetUserProfile($userId: String!) {
  getUserProfile(user_id: $userId) {
    user_id
    name
    phone
    address
    dob
    email
    username
    membership_num
  }
}`;

const UPDATE_USER_PROFILE = gql`
mutation UserProfileUpdate($uId: String!, $updates: userUpdateInputs!) {
  userProfileUpdate(user_id: $uId, updates: $updates) {
    name
    phone
    address
  }
}`;


function Profile() {

  const [isEdit, setIsEdit] = useState(false)

  const [user, setUser] = useState({
    user_id: "",
    name: "",
    phone: "",
    address: "",
    dob: "",
    email: "",
    username: "",
    membership_num: ""
  });

  const navigate = useNavigate();

  const isValid = useSelector((state) => state.auth.isValid);

  const { refetch } = useQuery(GET_USER_PROFILE, {
    variables: {
        userId: JSON.parse(localStorage.getItem("userInfo"))?.user_id
    },
    onCompleted: (data) => {
      console.log("user profile data fetched Successfully!");
      setUser(data.getUserProfile);
    },
    onError: (error) => {
      console.log("user profile data fetch failed!", error);
  }}); 

  const [updateUserProfile] = useMutation(UPDATE_USER_PROFILE, {
    onCompleted: (user) => {
        toast.success("User data Updated Successfully!");
        setUser(prevUser => ({
          ...prevUser, ...user.userProfileUpdate}));
    },
    onError: (err) => {
        toast.error(err.message);
    }
}); 


  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prevUser => ({
        ...prevUser,
        [name]: value,
    }));
  };

  const handleUpdateButtonClick = async (event) => {
    event.preventDefault();

    const { __typename, user_id, dob, email, username, membership_num, ...updates } = user;

    try {
      await updateUserProfile({
        variables: {
            uId: JSON.parse(localStorage.getItem("userInfo"))?.user_id,
            updates: updates
          }
          });
          setIsEdit(!isEdit);
    } catch (error) {
        console.error("Error adding user:", error);
    }

  }

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (!isValid && !isWebTokenValid()) {
    return <Navigate to="/login" />;
  }

  return (
  <>
    <Toaster />

    <div className='user-profile-section'>
      <h1 className='profile-heading'> User Profile </h1>
        <form onSubmit={handleUpdateButtonClick}>
            <div className='user-profile-form-section1'>
                <span>
                    <label>User ID:</label>
                    <input
                      type="text"
                      onChange={handleChange}
                      name="user_id"
                      value={user ? user.user_id: "No Data Found"}
                      disabled
                    />
                </span>
                <span>
                    <label>User Name:</label>
                    <input
                      type="text"
                      onChange={handleChange}
                      name="username"
                      value={user ? user.username: "No Data Found"}
                      disabled
                    />
                </span>
            </div>

            <div className='user-profile-form-section1'>
                <span>
                    <label>MemberShip Number:</label>
                    <input
                      type="text"
                      onChange={handleChange}
                      name="membership_num"
                      value={user ? user.membership_num: "No Data Found"}
                      disabled
                    />
                </span>
                <span>
                    <label>Email:</label>
                    <input
                        type="text"
                        onChange={handleChange}
                        name="email"
                        value={user ?user.email:"No Data Found"}
                        disabled
                    />
                </span>
            </div>
            
            <div className='user-profile-form-section1'>

                <span>

                    <label>Name:</label>
                    <input
                      type="text"
                      onChange={handleChange}
                      name="name"
                      value={user ? user.name: "No Data Found"}
                      disabled={isEdit ? "" : "disabled"}
                      required
                    />
                </span>
                <span>
                    <label>phone:</label>
                    <input
                      type="text"
                      onChange={handleChange}
                      name="phone"
                      value={user ? user.phone: "No Data Found"}
                      disabled={isEdit ? "" : "disabled"}
                      pattern="^\d{10}$"
                      maxlength="10"
                      title="Please enter a valid phone number."
                      required
                    />
                </span>
                
            </div>

            <label>Address:</label>
            <textarea name='address' onChange={handleChange} value={user ?user.address:"No Data Found"} disabled={isEdit ? "" : "disabled"} required ></textarea>

            <label>Date of Birth:</label>
            <input
              type="text"
              onChange={handleChange}
              name="dob"
              value={user ? user.dob.split('T')[0]:"No Data Found"}
              disabled
            />

            <div className='user-profile-form-buttons'>
              <span>
                <button type="button" onClick={() => setIsEdit(!isEdit)}>
                    {isEdit ? "Cancel": "Edit"}
                </button>
              </span>
              <span>
              {isEdit ? (
                  <button type='submit'>
                    Update
                  </button>
                )
                :
                (
                  <button type='button' onClick={() => navigate("/profile/librarycard")}>
                    Generate Card
                  </button>
                )
                }
              </span>
          </div>
        </form>
    </div>

  </>
  )
}

export default Profile