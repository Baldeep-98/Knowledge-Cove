const { UserInputError, AuthenticationError} = require('apollo-server');
const { getDB } = require('./db');
const bcrypt = require('bcrypt');
const getJwtToken = require('./getJwtToken');

const userValidate = (user) => {
    var errors = [];

    var userAge = Math.floor((new Date() - user.dob) / (1000 * 60 * 60 * 24 * 365));
    console.log(userAge)
    
    if (!(userAge >= 12)) {
        errors.push('User age must be greater than 11!');
    }

    if (user.password != user.cnfPassword){
        errors.push(' Password and confirm password do not match!');
    }

    if (errors.length > 0) {
        throw new UserInputError('Invalid input(s): '+ errors.toString());
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

    console.log(userCred.username.toLowerCase())

    const user = await db.collection('users').findOne({
        $or: [
            { username: userCred.username.toLowerCase() },
            { email: userCred.username.toLowerCase() },
            { membership_num: userCred.username.toLowerCase() }
        ]
    });

    const comparePasswords = async (inputPass, storedpass) => {
        try {
            const  matchResult= await bcrypt.compare(inputPass, storedpass);
            console.log(matchResult)
            return matchResult;
        } catch (err) {
            console.error('Error in password comparison', err);
            throw err;
        }
    };

    if(user && await comparePasswords(userCred.password, user.password)){
        console.log(user);
        webToken = getJwtToken(user.user_id);
        console.log(webToken);
        return {user, webToken}
    }else {
        throw new AuthenticationError('Invalid username or password');
    }
};

const userAdd = async (_, args) => {

    const db = getDB();
    const { user } = args;

    console.log("user check"+ user);
    userValidate(user);

    const userDetail = await db.collection('users').findOne({ email: user.email });
    if(userDetail){
        console.log(userDetail)
        throw new AuthenticationError('User already exists');
    }

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

    const bcryptPass = async (pass) => { 
        const bcryptPassResult = await bcrypt.hash(pass, 10)
        return bcryptPassResult;
    }

    const userCrd = {
        user_id: user.user_id.toLowerCase(),
        email:user.email.toLowerCase(),
        password: await bcryptPass(user.password),
        username:user.username.toLowerCase(),
        membership_num:user.membership_num
    };

    const result1 = await db.collection('usersInfo').insertOne(userInfo);
    const savedUserInfo = await db.collection('usersInfo').findOne({_id: result1.insertedId});

    const result2 = await db.collection('users').insertOne(userCrd);
    const savedUser = await db.collection('users').findOne({_id: result2.insertedId});
    return savedUserInfo;
}

const getUserProfile = async (_,args) => {
    const db = getDB();
    const {user_id} = args

    console.log(user_id)

    const userInfo1 = await db.collection('usersInfo').findOne({user_id: user_id});
    const userInfo2 = await db.collection('users').findOne({user_id: user_id});

    if (!userInfo1 || !userInfo2) {
        throw new Error('User profile not found');
    }

    const userInfo = {
        user_id: userInfo1.user_id,
        name: userInfo1.name,
        phone: userInfo1.phone,
        address: userInfo1.address,
        dob: userInfo1.dob,
        email: userInfo2.email,
        username: userInfo2.username,
        membership_num: userInfo2.membership_num
    }

    return userInfo;
};

const updateUserProfile = async (_,args) => {

    const db = getDB();
    const {user_id, updates} = args

    if (updates.name || updates.phone || updates.address) {
        const user = await db.collection('usersInfo').findOne({ user_id });
        Object.assign(user, updates);
    }
    await db.collection('usersInfo').updateOne({ user_id }, { $set : updates });
    const savedInfo = await db.collection('usersInfo').findOne({ user_id });
    console.log(savedInfo)
    return savedInfo;
};


module.exports = { getUser, userAdd, getUserProfile, updateUserProfile };