const axios = require('axios');
const config = require('../config');
const { ApiError } = require('./errorHandler');
const logger = require('./logger');
const { StatusCodes } = require('http-status-codes');

class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: config.api.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Initialize token storage
    this.accessToken = config.auth.accessToken || null;
    
    // Add request interceptor for auth token
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token to requests if available
        if (this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
        }
        return config;
      },
      (error) => {
        logger.error('Request error:', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => {
        return response.data;
      },
      async (error) => {
        const originalRequest = error.config;
        
        // Handle token refresh if 401 and not already retrying
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
          try {
            originalRequest._retry = true;
            
            // Try to refresh the token
            const newToken = await this.refreshToken();
            if (newToken) {
              this.setAccessToken(newToken);
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return this.client(originalRequest);
            }
          } catch (refreshError) {
            logger.error('Token refresh failed:', refreshError);
            // If refresh fails, clear token and reject with auth error
            this.clearTokens();
            return Promise.reject(
              new ApiError(
                StatusCodes.UNAUTHORIZED,
                'Authentication failed. Please log in again.'
              )
            );
          }
        }

        // Handle API error responses
        if (error.response) {
          const { status, data } = error.response;
          const message = data.message || 'An error occurred with the API request';
          
          logger.error(`API Error: ${status} - ${message}`, {
            url: originalRequest.url,
            method: originalRequest.method,
            data: originalRequest.data,
            response: data
          });
          
          return Promise.reject(
            new ApiError(status, message, true, error.stack)
          );
        }
        
        // Handle network errors
        if (error.request) {
          logger.error('Network Error:', error.message);
          return Promise.reject(
            new ApiError(
              StatusCodes.SERVICE_UNAVAILABLE,
              'Network error. Please check your connection.',
              true,
              error.stack
            )
          );
        }
        
        // Handle other errors
        logger.error('API Client Error:', error.message);
        return Promise.reject(
          new ApiError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            'An unexpected error occurred',
            false,
            error.stack
          )
        );
      }
    );
  }

  // Set access token
  setAccessToken(token) {
    this.accessToken = token;
  }

  // Clear tokens
  clearTokens() {
    this.accessToken = null;
  }

  // Refresh token implementation
  async refreshToken() {
    try {
      const response = await this.client.post('/team/auth/refresh-token');
      return response.data?.token;
    } catch (error) {
      logger.error('Failed to refresh token:', error);
      throw error;
    }
  }

  // Generic request method
  async request(method, url, data = null, headers = {}) {
    try {
      const config = {
        method,
        url,
        ...(data && { data }),
        headers
      };
      
      return await this.client(config);
    } catch (error) {
      throw error;
    }
  }

  // Convenience methods for different HTTP methods
  async get(url, params = {}, headers = {}) {
    return this.request('get', url, null, { ...headers, params });
  }

  async post(url, data = {}, headers = {}) {
    return this.request('post', url, data, headers);
  }

  async put(url, data = {}, headers = {}) {
    return this.request('put', url, data, headers);
  }

  async delete(url, data = {}, headers = {}) {
    return this.request('delete', url, data, headers);
  }
}

// Create and export a singleton instance
const apiClient = new ApiClient();
module.exports = apiClient;

