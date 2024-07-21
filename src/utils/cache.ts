import { connectDB } from '../db';

export async function getCachedWeather(lat: number, lon: number) {
  try {
    const db = await connectDB();
    const cache = await db.collection('weatherCache').findOne({ lat, lon });
    return cache;
  } catch (error) {
    console.error('Error retrieving cached weather:', error);
    throw error;
  }
}

export async function saveWeatherToCache(lat: number, lon: number, data: object) {
  try {
    const db = await connectDB();
    await db.collection('weatherCache').updateOne(
      { lat, lon },
      { $set: { data, lastUpdated: new Date() } },
      { upsert: true }
    );
  } catch (error) {
    console.error('Error saving weather to cache:', error);
    throw error;
  }
}
