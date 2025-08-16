const apiClient = require('../utils/apiClient');
const logger = require('../utils/logger');

class AuthService {
  /**
   * Login with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} Login response with token
   */
  async login(email, password) {
    try {
      const response = await apiClient.post('/team/auth/login', { email, password });
      
      // Store the token if login is successful
      if (response.data && response.data.token) {
        apiClient.setAccessToken(response.data.token);
      }
      
      return response;
    } catch (error) {
      logger.error('Login failed:', error.message);
      throw error;
    }
  }

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @param {string} userData.first_name - First name
   * @param {string} userData.last_name - Last name
   * @param {string} userData.middle_name - Middle name (optional)
   * @param {string} userData.email - Email
   * @param {string} userData.password - Password
   * @returns {Promise<Object>} Registration response
   */
  async register(userData) {
    try {
      return await apiClient.post('/team/auth/register', userData);
    } catch (error) {
      logger.error('Registration failed:', error.message);
      throw error;
    }
  }

  /**
   * Verify email with token
   * @param {string} token - Verification token
   * @returns {Promise<Object>} Verification response
   */
  async verifyEmail(token) {
    try {
      return await apiClient.get(`/team/auth/verify-email/${token}`);
    } catch (error) {
      logger.error('Email verification failed:', error.message);
      throw error;
    }
  }

  /**
   * Resend verification email
   * @param {string} email - User email
   * @returns {Promise<Object>} Response
   */
  async resendVerification(email) {
    try {
      return await apiClient.post('/team/auth/resend-verification', { email });
    } catch (error) {
      logger.error('Resend verification failed:', error.message);
      throw error;
    }
  }

  /**
   * Request password reset
   * @param {string} email - User email
   * @returns {Promise<Object>} Response
   */
  async forgotPassword(email) {
    try {
      return await apiClient.post('/team/auth/forgot-password', { email });
    } catch (error) {
      logger.error('Forgot password request failed:', error.message);
      throw error;
    }
  }

  /**
   * Reset password with token
   * @param {string} token - Reset token
   * @param {string} newPassword - New password
   * @param {string} confirmPassword - Confirm password
   * @returns {Promise<Object>} Response
   */
  async resetPassword(token, newPassword, confirmPassword) {
    try {
      return await apiClient.post(`/team/auth/reset-password/${token}`, {
        new_password: newPassword,
        confirm_password: confirmPassword
      });
    } catch (error) {
      logger.error('Password reset failed:', error.message);
      throw error;
    }
  }

  /**
   * Refresh authentication token
   * @returns {Promise<Object>} New token
   */
  async refreshToken() {
    try {
      const response = await apiClient.post('/team/auth/refresh-token');
      
      // Update the token if refresh is successful
      if (response.data && response.data.token) {
        apiClient.setAccessToken(response.data.token);
      }
      
      return response;
    } catch (error) {
      logger.error('Token refresh failed:', error.message);
      throw error;
    }
  }

  /**
   * Logout (revoke token)
   * @returns {Promise<Object>} Response
   */
  async logout() {
    try {
      const response = await apiClient.delete('/team/auth/revoke-token');
      
      // Clear tokens after logout
      apiClient.clearTokens();
      
      return response;
    } catch (error) {
      logger.error('Logout failed:', error.message);
      throw error;
    }
  }
}

module.exports = new AuthService();

