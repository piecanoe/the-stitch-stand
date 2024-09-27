import { connectToServer } from './connect.js';
import express from 'express';
import cors from 'cors';
import eventRoutes from './eventRoutes.js';
import productRoutes from './productRoutes.js';
import userRoutes from './userRoutes.js';
import awsRoutes from './awsRoutes.js';
import multer from 'multer';
const upload = multer();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(upload.any());
app.use(eventRoutes);
app.use(productRoutes);
app.use(userRoutes);
app.use(awsRoutes);

app.listen(PORT, () => {
  connectToServer();
  console.log(`Server is running on port ${PORT}`);
});
