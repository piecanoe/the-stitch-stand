import { connectToServer } from './connect.js';
import express from 'express';
import cors from 'cors';
import eventRoutes from './eventRoutes.js';
import productRoutes from './productRoutes.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(eventRoutes);
app.use(productRoutes);

app.listen(PORT, () => {
  connectToServer();
  console.log(`Server is running on port ${PORT}`);
});
