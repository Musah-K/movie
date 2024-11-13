import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import userRouter from './routes/userRoutes.js';
import genreRouter from './routes/genreRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

dotenv.config();
connectDb();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.use('/routes', userRouter);
app.use('/routes/genre', genreRouter);
app.use('/routes/movies', movieRoutes);
app.use('/routes/upload', uploadRoutes);

// Serve static files from the "uploads" directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
