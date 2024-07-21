import request from 'supertest';
import express from 'express';
import { connectDB } from '../../src/db';
import { getWeather } from '../../src/controllers/weatherController';

const app = express();

let db: any;

beforeAll(async () => {
  db = await connectDB();
  app.get('/weather', (req, res) => getWeather(req, res));
});

afterAll(async () => {
  await db.client.close();
});

describe('Weather API Integration Test', () => {
  it('should return weather data', async () => {
    const response = await request(app)
      .get('/weather')
      .query({ lat: '34', lon: '139' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('hourly');
    expect(response.body).toHaveProperty('daily');
  });

  it('should return 400 error if latitude is missing', async () => {
    const response = await request(app)
      .get('/weather')
      .query({ lon: '139' });

    expect(response.status).toBe(400);
  });

  it('should return 400 error if longitude is missing', async () => {
    const response = await request(app)
      .get('/weather')
      .query({ lat: '55' });

    expect(response.status).toBe(400);
  });
});
