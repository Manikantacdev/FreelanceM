// API Configuration
import axios from 'axios';

const API_BASE_URL = 'https://freelancerm-api.onrender.com';

// Create axios instance with base URL
export const api = axios.create({
  baseURL: API_BASE_URL,
});

export default API_BASE_URL;
