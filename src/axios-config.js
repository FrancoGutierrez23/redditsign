// src/axios-config.js

import axios from 'axios';

// Optional: Set a default base URL for all Axios requests
axios.defaults.baseURL = 'https://api.example.com'; // Replace with your API URL

// Optional: Set other default configurations like headers
axios.defaults.headers.common['Authorization'] = 'Bearer YOUR_TOKEN';

// Export the configured instance
export default axios;
