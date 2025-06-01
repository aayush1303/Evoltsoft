import express from 'express';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';
import stationRouter from './routes/stationRoute.js';
import cors from 'cors';
import 'dotenv/config.js';  

//app config
const app = express();
const port = 4000;

app.use(cors({
  origin: ['https://evoltsoft-frontend.vercel.app','http://localhost:5173'] // Replace with your frontend and admin domains
}));


//middleware
app.use(express.json());app

//db connection
connectDB();

//api endpoints
app.use('/api/user', userRouter);
app.use('/api/station', stationRouter);


app.get('/', (req, res) => {
    res.send('API Working');
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});



