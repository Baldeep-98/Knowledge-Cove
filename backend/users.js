const { UserInputError, AuthenticationError} = require('apollo-server');
const { getDB } = require('./db');

const userValidate = (user) => {
    const errors = [];

    var userAge = Math.floor((new Date() - user.dob) / (1000 * 60 * 60 * 24 * 365));
    console.log(userAge)
    
    if (!(userAge >= 12)) {
        errors.push('User age must be greater than 11!');
    }

    if (user.password != user.cnfPassword){
        errors.push('Password and confirm password do not match!');
    }

    if (errors.length > 0) {
        throw new UserInputError('Invalid input(s)', { errors });
    }
} 

function generateUniqueId() {
    const randomNum = Math.floor(Math.random() * 1000000);
    const timestamp = Date.now();
    const uniqueId = `${timestamp}-${randomNum}`;
    return uniqueId;
}

function generateMembershipNumber() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    const getRandomChars = (chars, length) => 
        Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');

    const letterPart = getRandomChars(letters, 3);
    const numberPart = getRandomChars(numbers, 5);

    return letterPart + numberPart;
}

const getUser = async (_,args) => {
    const db = getDB();
    const {userCred} = args

    console.log(userCred.username)

    const user = await db.collection('users').findOne({
        $or: [
            { username: userCred.username },
            { email: userCred.username },
            { membership_num: userCred.username }
        ]
    });
    console.log(user)

    if(user && (user.password === userCred.password)){
        return user
    }else {
        throw new AuthenticationError('Invalid username or password');
    }
};

const userAdd = async (_, args) => {

    const db = getDB();
    const { user } = args;

    console.log(user);
    userValidate(user);

    user.user_id = generateUniqueId();
    user.membership_num = generateMembershipNumber();
    user.username = user.email.split('@')[0];

    const userInfo = {
        user_id: user.user_id,
        name:user.name,
        phone:user.phone,
        address:user.address,
        dob:user.dob
    };

    const userCrd = {
        user_id: user.user_id,
        email:user.email,
        password:user.password,
        username:user.username,
        membership_num:user.membership_num
    };

    const result1 = await db.collection('usersInfo').insertOne(userInfo);
    const savedUserInfo = await db.collection('usersInfo').findOne({_id: result1.insertedId});

    const result2 = await db.collection('users').insertOne(userCrd);
    const savedUser = await db.collection('users').findOne({_id: result2.insertedId});
    return savedUserInfo;
}


module.exports = { getUser, userAdd };