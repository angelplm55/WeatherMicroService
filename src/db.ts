import { MongoClient } from 'mongodb';

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(url);

export async function connectDB (){
  try {
    await client.connect();
    return client.db('weatherDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    throw error;
  }
}
