// API Configuration
import axios from 'axios';

const API_BASE_URL = import.meta.env.PROD 
  ? 'https://freelancerm-api.onrender.com'  // Production
  : 'http://localhost:6001';                 // Development

// Create axios instance with base URL
export const api = axios.create({
  baseURL: API_BASE_URL,
});

export default API_BASE_URL;
