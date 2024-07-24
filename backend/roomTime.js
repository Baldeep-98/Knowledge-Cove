const { getDB } = require('./db');

const timeAdd = async (_, args) => {

    const db = getDB();
    const { timeSlot } = args;

    console.log(timeSlot);

    const result = await db.collection('rooms').insertOne(timeSlot);
    const savedTimeInfo = await db.collection('rooms').findOne({_id: result.insertedId});
    return savedTimeInfo;
}

const getBookedRoom = async (_,args) => {
    const db = getDB();
    const {bookedRoom} = args
    const dateTime = bookedRoom.booking_date;

    const result = await db.collection('rooms').find({booking_date_time: { $regex : dateTime } }).toArray();

    return result; 
};


module.exports = { timeAdd , getBookedRoom};