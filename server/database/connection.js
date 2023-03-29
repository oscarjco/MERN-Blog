import mongoose from "mongoose";

const BASE_URL = "mongodb://localhost:27017/";
const SUCCESS_MESSAGE = "Successfully connected to database";
const ERROR_MESSAGE = "Failed to connect to database";

const connection = async (dbName) => {
  try {
    mongoose.connect(`${BASE_URL}${dbName}`);
    console.log(`${SUCCESS_MESSAGE} - ${dbName}`);
  } catch (error) {
    console.log(error);
    throw new Error(ERROR_MESSAGE);
  }
};

export default connection;