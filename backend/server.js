import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import connectDB from './config/mongodb.js';

connectDB();
const PORT = process.env.PORT || 4000
const app = express();

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>res.send("API Working"))

app.listen(PORT,console.log('Server running on port '+PORT)); 