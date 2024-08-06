import express from 'express';
import { ApiRouter } from './controllers/BO/apis';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import cors from "./middlewares/cors";



const app = express();

mongoose.connect('mongodb+srv://sourabhs:sourabhs@cluster0.fuw2xdu.mongodb.net/DB1', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});


app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
app.use(cors());
app.use('/bo/apis', ApiRouter);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});