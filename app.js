import express from "express";
import cors from "cors"
import path from 'path';

const app = express();

 // CORS middleware
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    credentials: true, 
  };

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
  
 app.use(cors(corsOptions));
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));

// authMiddleware
import authMiddleware from "./middleware/authMiddleware.js"

// user api
import users from "./routes/users.js"
app.use("/api/users", users);

// media api shared
import {getSharedMedia} from "./controllers/mediasController.js"
app.get('/api/medias/shared/:shareId', getSharedMedia);

// media api
import medias from "./routes/medias.js"
app.use("/api/medias", authMiddleware, medias);

// 404 Middleware
import notFound from "./middleware/notFoundMiddleware.js";
app.use(notFound);

export default app;