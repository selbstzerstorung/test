import axios from 'axios';

// API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
const API_TIMEOUT = 30000; // 30 seconds

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Get auth token from localStorage
        const token = localStorage.getItem('bank_access_token');

        // Add authorization header if token exists
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Add request timestamp for debugging
        config.headers['X-Request-Timestamp'] = Date.now();

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        // You can modify response data here
        return response.data;
    },
    (error) => {
        const { response } = error;

        // Handle network errors
        if (!response) {
            console.error('Network error:', error);
            throw new Error('Network error. Please check your connection.');
        }

        // Handle specific HTTP status codes
        switch (response.status) {
            case 401:
                // Unauthorized - clear tokens and redirect to login
                localStorage.removeItem('bank_access_token');
                localStorage.removeItem('bank_refresh_token');
                localStorage.removeItem('bank_auth');
                window.location.href = '/login';
                break;

            case 403:
                // Forbidden
                console.error('Access forbidden:', error);
                throw new Error('You do not have permission to access this resource.');

            case 404:
                // Not found
                console.error('Resource not found:', error);
                throw new Error('The requested resource was not found.');

            case 422:
                // Validation error
                console.error('Validation error:', error);
                throw new Error(response.data?.message || 'Validation failed.');

            case 429:
                // Too many requests
                console.error('Rate limit exceeded:', error);
                throw new Error('Too many requests. Please try again later.');

            case 500:
                // Server error
                console.error('Server error:', error);
                throw new Error('Server error. Please try again later.');

            default:
                // Other errors
                console.error('API error:', error);
                throw new Error(response.data?.message || 'An error occurred.');
        }

        return Promise.reject(error);
    }
);

// API methods for common operations
export const apiMethods = {
    // GET request
    get: async (url, config = {}) => {
        try {
            return await api.get(url, config);
        } catch (error) {
            throw error;
        }
    },

    // POST request
    post: async (url, data = {}, config = {}) => {
        try {
            return await api.post(url, data, config);
        } catch (error) {
            throw error;
        }
    },

    // PUT request
    put: async (url, data = {}, config = {}) => {
        try {
            return await api.put(url, data, config);
        } catch (error) {
            throw error;
        }
    },

    // PATCH request
    patch: async (url, data = {}, config = {}) => {
        try {
            return await api.patch(url, data, config);
        } catch (error) {
            throw error;
        }
    },

    // DELETE request
    delete: async (url, config = {}) => {
        try {
            return await api.delete(url, config);
        } catch (error) {
            throw error;
        }
    },

    // File upload
    upload: async (url, file, config = {}) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            return await api.post(url, formData, {
                ...config,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (error) {
            throw error;
        }
    },

    // Multiple concurrent requests
    all: async (requests) => {
        try {
            return await axios.all(requests);
        } catch (error) {
            throw error;
        }
    },
};

// Export the axios instance for custom configurations
export default api;
