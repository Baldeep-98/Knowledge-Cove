const { ObjectId } = require('mongodb');
const { getDB } = require('./db.js');

const checkout = async (parent, { order }, context, info) => {
    const db = getDB();

    const { billingName, billingEmail, billingAddress, shippingName, shippingAddress, cardNumber, cardCVV, membership_num, items } = order;

    try {
        const bookIssued = items.map(item => ({
            book_id: item.book_id,
            membership_num: membership_num,
            issue_date: new Date(),
            exp_date: new Date(new Date().setMonth(new Date().getMonth() + 1))
        }));

        await db.collection('booksIssued').insertMany(bookIssued);
        await db.collection('cart').deleteMany({ membership_num: membership_num });

        console.log('Checkout successful and cart cleared');
        return true; 
    } catch (error) {
        console.log('Error in checkout', error);
        return false; 
    }
};

module.exports = { checkout };
