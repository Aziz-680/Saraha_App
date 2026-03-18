import mongoose from "mongoose";
import envConfig from './../config/env.config.js';

const database = envConfig.database;


const dbConnection = async () => {
    try {
        await mongoose.connect(database.MONGO_URL);
        console.log("DB Connection is OK");
    } catch (error) {
        console.log("DB Connnection is Not OK!",error);
    }
}

export default dbConnection;