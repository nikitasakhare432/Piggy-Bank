import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import BankRoutes from './routes/Bank.js';
import authRoutes from './routes/auth.js';
import jarRoutes from './routes/jarRoutes.js';




const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/bank', BankRoutes);
app.use('/api/jar', jarRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});

//app.use('/api/dashboard', require('./routes/dashboardRoutes'));

