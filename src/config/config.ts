import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export default {
  port: process.env.PORT || 3000,
};