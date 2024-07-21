import axios from 'axios';

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';

export async function getWeatherData(lat: number, lon: number){
  const url = `${BASE_URL}?lat=${lat}&lon=${lon}&exclude=minutely,alerts,current&appid=${API_KEY}`;
  const response = await axios.get(url);

  return response.data;
};
