import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import doneImage from "../assets/Images/done.png";

const Confirmation = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { formData, cartItems } = state || {};

    const handlePrintInvoice = () => {
        navigate("/invoice", { state: { formData, cartItems } });
    };

    return (
        <>
            <h2 className="confirm-heading">Order Confirmation</h2>
            <div className="popup">
                <img src={doneImage} alt="Order Completed" />
                <h2>Thank You!</h2>
                <p>Your order is placed successfully.</p>
                <button type="button" onClick={handlePrintInvoice}>Print Invoice</button>
            </div>
        </>
    );
}

export default Confirmation;
