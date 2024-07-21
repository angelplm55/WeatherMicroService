import express from 'express';
import dotenv from 'dotenv';
import { getWeather } from './controllers/weatherController';

dotenv.config();

export const app = express();
const port = process.env.PORT || 3000;

app.get('/weather', (req, res) => getWeather(req, res));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});