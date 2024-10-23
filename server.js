import app from "./app.js";
import dotenv from "dotenv";
import cors from "cors"
import connectDB from './db/config.js';

connectDB();

dotenv.config({path: "./.env"})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log('app listening on', PORT)
})