import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import connectDB from './config/mongodb.js';
import userRoutes from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js';
import promptRoutes from './routes/promptRoutes.js';
import mailRoutes from './routes/mailRoutes.js';
import cookieParser from 'cookie-parser';

connectDB();
const PORT = process.env.PORT || 4000
const app = express();

app.use(cors({
    origin: "https://enchanting-semifreddo-0a6e5e.netlify.app",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use('/api/prompt',promptRoutes);
app.use('/api/user',userRoutes);
app.use('/api/image',imageRouter);
app.use('/api/mailer/',mailRoutes);

app.get('/',(req,res)=>res.send("API Working"))

app.listen(PORT,console.log('Server running on port '+PORT)); 