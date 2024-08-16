import React, { useState } from 'react';
import { useMutation, gql} from '@apollo/client';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isWebTokenValid } from '../webTokenVerification';

const UPDATE_PLAN = gql`
mutation UpdateUserMembershipPlan($planInfo: userMemberPlanInputs!) {
    UpdateUserMembershipPlan(planInfo: $planInfo) {
        membership_num
    }
}`;



function PlanPayment() {
    const location = useLocation();
    const { plan } = location.state || {};

    const navigate = useNavigate();

    const isValid = useSelector((state) => state.auth.isValid);
    const isAdmin = useSelector((state) => state.auth.isAdmin);

    if (!plan) {
        Navigate("/services")
    }

    const [planInfo, setPlanInfo] = useState({
        purch_email: "",
        card_num: "",
        card_expire: "",
        card_cvv: "",
        purch_city: "",
        purch_postal: "",
        membership_num: JSON.parse(localStorage.getItem("userInfo"))?.membership_num,
        member_plan: plan?.subhead.split(' ')[0]
    });

    const [UpdateUserMembershipPlan] = useMutation(UPDATE_PLAN, {
        onCompleted: (usersPlanInfo) => {
            setPlanInfo({
                purch_email: "",
                card_num: "",
                card_expire: "",
                card_cvv: "",
                purch_city: "",
                purch_postal: "",
                membership_num: JSON.parse(localStorage.getItem("userInfo"))?.membership_num,
                member_plan: plan?.subhead.split(' ')[0]
            });
            
            navigate("/");
        },
        onError: (err) => {
            toast.error(err.message);
        }
    }); 

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPlanInfo(prevUser => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleAddButtonClick = async (event) => {

        event.preventDefault();
        const newPlanInfo= {
            ...planInfo
        };

        console.log(newPlanInfo);

        try {
            await UpdateUserMembershipPlan({ variables: { planInfo: newPlanInfo } });
        } catch (error) {
            console.error("Error updating user plan:", error);
        }
    };

    if (!plan) {
        return <p>No plan selected. Please go back and select a plan.</p>;
    }

    if (!isValid && !isWebTokenValid()) {
        return <Navigate to="/login" />;
    }

    if (isValid && isAdmin) {
        return <Navigate to="/home" />;
    }
    

    return (
        <div className='plan-payment'>
            <Toaster/>
            <h2>Payment Summary</h2>

            <div className='payment-info-section'>
                <div className='plan-info'>
                    <h3>{plan?.subhead}</h3>
                    <p>{plan?.para}</p>
                    <ul>
                        <li>{plan?.l1}</li>
                        <li>{plan?.l2}</li>
                        <li>{plan?.l3}</li>
                        <li>{plan?.l4}</li>
                    </ul>
                    <p className='plan-price'>{plan?.price}</p>

                    <hr />

                    <div className='plan-checkout-logo'>
                        <label>
                            Knowledge <br />
                            Cove Library
                        </label>
                    </div>
                </div>

                <div className='plan-payment-form'>
                    <h3>Pay with card</h3>
                    <form onSubmit={handleAddButtonClick}>
                        <label>Email:</label>
                        <input type="email" onChange={handleChange} name="purch_email" value={planInfo.purch_email} required/>

                        <label>Card Number:</label>
                        <input type="text" onChange={handleChange} name="card_num" value={planInfo.card_num} 
                            pattern="^\d{16}$"
                                maxLength="16"
                                title="Please enter a valid CardNumber of 16 digits."
                                required
                            />

                        <div>
                            <span>
                                <label>Expiration:</label>
                                <input type="text" onChange={handleChange} name="card_expire" value={planInfo.card_exp} 
                                    placeholder="MMYY"
                                    pattern="^(0[1-9]|1[0-2])\d{2}$"
                                    maxlength="4"
                                    title="Please enter a valid date format (MMYY)."
                                    required
                                />
                            </span>
                            <span>
                                <label>CVV:</label>
                                <input type="password" onChange={handleChange} name="card_cvv" value={planInfo.card_cvv} 
                                    pattern="^\d{3}$"
                                    maxlength="3"
                                    title="Please enter a valid CVV number of 3 digits."
                                    required
                                />
                            </span>
                        </div>

                        <label>City:</label>
                        <input type="text" onChange={handleChange} name="purch_city" value={planInfo.purch_city} required/>

                        <label>Postal Code:</label>
                        <input type="text" onChange={handleChange} name="purch_postal" value={planInfo.purch_postal} 
                            pattern="^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$"
                            placeholder="A1A1A1"
                            maxlength="6"
                            title="Please enter a valid postal Code with Formt (A1A1A1)."
                            required
                            />

                        <button>Pay {plan?.price.split('/')[0]}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PlanPayment;
