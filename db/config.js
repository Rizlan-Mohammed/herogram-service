import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
    try {
        const DB = process.env.DATABASE.replace(
            "<db_password>",
            process.env.DATABASE_PASSWORD
        );
        mongoose
            .connect(DB, {
                connectTimeoutMS: 30000,
              })
            .then(() => {
                console.log(`Mongodb Connected at : ${mongoose?.connection?.host}`);
            });
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

export default connectDB;
