import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';

import connectDB from './config/db.js';
import router from './routes/index.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    allowedHeaders: '*',
  })
);

app.use('/api', router);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server has started on port ${port}`));
