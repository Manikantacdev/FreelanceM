// API Configuration
const config = {
  // Change this to your deployed backend URL for production
  API_BASE_URL: import.meta.env.PROD 
    ? 'https://freelancem-api.onrender.com'  // Production (update with your Render URL)
    : 'http://localhost:6001',                // Development
};

export default config;
