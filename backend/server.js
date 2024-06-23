const express = require('express');
require('dotenv').config();
const { installHandler } = require('./apiHandler');
const { connectToDb } = require('./db');

const PORT = process.env.PORT || 4500;

installHandler(PORT);

(async () => {
    await connectToDb();
    console.log('[Connected to MongoDB] from api server');
    
})()



