import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();



const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) {
    throw new Error("Invalid environment variable: MONGODB_URI");
}

export const dbConnection = async () => {
    try {
        const { connection } = await mongoose.connect(MONGODB_URI)
        if (connection.readyState === 1) {
            console.log('connected to db...........')
            return connection.asPromise()
        }
    } catch (error) {
        console.log(error)
        console.log('failed connecting')
    }
}

