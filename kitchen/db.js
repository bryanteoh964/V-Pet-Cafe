const mongoose = require('mongoose')
require('dotenv').config();

const DB_PASS = process.env.DB_PASS;
const DB_USER = process.env.DB_USER;

const mongoDB = `mongodb+srv://${DB_USER}:${DB_PASS}@testcluster.2fg4qgr.mongodb.net/?retryWrites=true&w=majority`

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDB, { 
      useNewUrlParser: true
    });
    console.log('Connected to DB');
  } catch (err) {
    console.log('Error connecting to DB', err);
  }
}

module.exports = connectDB;