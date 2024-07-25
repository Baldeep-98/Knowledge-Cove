import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isWebTokenValid } from '../webTokenVerification';

function Checkout() {

    const isValid = useSelector((state) => state.auth.isValid);

    if (!isValid && !isWebTokenValid()) {
        return <Navigate to="/login" />;
    }
    return (
        <div>Checkout</div>
    )
}

export default Checkout