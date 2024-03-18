import express from 'express';
import dotenv from 'dotenv';
import morgon from 'morgan';
import connectDB from './config/db.js';
import routes from "./routes/index.js"
import bodyParser from 'body-parser';
import consumeMessages from './worker/consumer.js';
const app = express();

dotenv.config()

connectDB();

app.use(express.json())
app.use(morgon('dev'));
app.use(bodyParser.json("application/json"))
app.use('/', routes);

consumeMessages()

const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})
