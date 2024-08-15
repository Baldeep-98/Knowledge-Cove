import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function ServiceOptionCard() {
    const [plan, setPlan] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            const memberPlan = JSON.parse(userInfo)?.member_plan;
            console.log(memberPlan)
            setPlan(memberPlan);
        }
    }, []);

    const options = [
        {
            "id": 1,
            "subhead": "Standard Plan",
            "para": "Flexibility at its best. Get all the benefits of our Standard membership with a convenient one time payment plan.",
            "l1": "Book Borrowing: Up to 5 books per month",
            "l2": "Private Room Reservation: 5 hours per week",
            "l3": "Support: Priority email support",
            "l4": "Additional Benefits: Early access to new releases and library events",
            "price": "Price: $10",
            "btnId": "standard-plan"
        },
        {
            "id": 2,
            "subhead": "Premium Plan",
            "para": "Share the knowledge. Our premium plan offers premium access for up to 4 family members at an unbeatable price.",
            "l1": "Access: Access to all premium articles and resources for 4 members",
            "l2": "Book Borrowing: Unlimited books",
            "l3": "Private Room Reservation: 10 hours per week",
            "l4": "Support: 24/7 dedicated support",
            "price": "Price: $20",
            "btnId": "premium-plan"
        }
    ];

    const handlePlanClick = (plan) => {
        navigate("/plan-payment", { state: { plan } });
    }

    const handlePlanDecline = (plan) => {
        toast('Already Member of '+plan.subhead, {
            icon: '⚠️',
        });
    }

    return (
        <>
        <Toaster/>
            {options.map(op => (
                <div key={op.id} className="optioncard">
                    <h3>{op.subhead}</h3>
                    <p>{op.para}</p>
                    <ul>
                        <li>{op.l1}</li>
                        <li>{op.l2}</li>
                        <li>{op.l3}</li>
                        <li>{op.l4}</li>
                    </ul>
                    <p>{op.price}</p>
                    <button
                        id={op.btnId}
                        onClick={ plan === op.subhead.split(" ")[0] ? () => handlePlanDecline(op) : () => handlePlanClick(op)}
                    >
                        Subscribe
                    </button>
                </div>
            ))}
        </>
    );
}

export default ServiceOptionCard;
