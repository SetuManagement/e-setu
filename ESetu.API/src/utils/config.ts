// src/config.ts
import { config } from 'dotenv';

// Load environment variables from .env file
config();

export const MONGO_URI = process.env.MONGO_URI || '';
export const DB_NAME = process.env.DB_NAME || '';
