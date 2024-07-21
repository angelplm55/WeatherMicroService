import { Request, Response } from 'express';
import { getWeatherData } from '../services/weatherService';
import { getCachedWeather, saveWeatherToCache } from '../utils/cache';

const THREE_HOURS_MS = 10800000;

type GetWeatherQueryParams = {
  lat: string;
  lon: string;
}

export async function getWeather(req: Request, res: Response){
  const { lat, lon } = req.query as GetWeatherQueryParams;

  if (!lat || !lon) {
    return res.status(400).send('Latitude and Longitude are required');
  }

  const latNum = parseFloat(lat);
  const lonNum = parseFloat(lon);

  const cachedWeather = await getCachedWeather(latNum, lonNum);

  if (cachedWeather && (new Date().getTime() - new Date(cachedWeather.lastUpdated).getTime()) < THREE_HOURS_MS) {
    return res.json(cachedWeather.data);
  }

  const weather = await getWeatherData(latNum, lonNum);
  await saveWeatherToCache( latNum, lonNum, weather);

  res.json(weather);
};
