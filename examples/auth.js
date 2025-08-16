/**
 * Example usage of the Auth API endpoints
 */

// Import the API client (if using as a library)
// const apiClient = require('../src/utils/apiClient');

// Using fetch for examples (in a browser or Node.js with node-fetch)
const API_URL = 'http://localhost:3000/api';

/**
 * Login example
 */
async function login() {
  try {
    const response = await fetch(`${API_URL}/team/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'user@example.com',
        password: 'password123'
      })
    });
    
    const data = await response.json();
    console.log('Login response:', data);
    
    // Store the token for future requests
    if (data.data && data.data.token) {
      localStorage.setItem('accessToken', data.data.token);
    }
    
    return data;
  } catch (error) {
    console.error('Login failed:', error);
  }
}

/**
 * Register example
 */
async function register() {
  try {
    const response = await fetch(`${API_URL}/team/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: 'John',
        last_name: 'Doe',
        middle_name: '',
        email: 'john.doe@example.com',
        password: 'securePassword123'
      })
    });
    
    const data = await response.json();
    console.log('Registration response:', data);
    return data;
  } catch (error) {
    console.error('Registration failed:', error);
  }
}

/**
 * Verify email example
 */
async function verifyEmail(token) {
  try {
    const response = await fetch(`${API_URL}/team/auth/verify-email/${token}`);
    const data = await response.json();
    console.log('Email verification response:', data);
    return data;
  } catch (error) {
    console.error('Email verification failed:', error);
  }
}

/**
 * Resend verification email example
 */
async function resendVerification(email) {
  try {
    const response = await fetch(`${API_URL}/team/auth/resend-verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    
    const data = await response.json();
    console.log('Resend verification response:', data);
    return data;
  } catch (error) {
    console.error('Resend verification failed:', error);
  }
}

/**
 * Forgot password example
 */
async function forgotPassword(email) {
  try {
    const response = await fetch(`${API_URL}/team/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    
    const data = await response.json();
    console.log('Forgot password response:', data);
    return data;
  } catch (error) {
    console.error('Forgot password request failed:', error);
  }
}

/**
 * Reset password example
 */
async function resetPassword(token, newPassword, confirmPassword) {
  try {
    const response = await fetch(`${API_URL}/team/auth/reset-password/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        new_password: newPassword,
        confirm_password: confirmPassword
      })
    });
    
    const data = await response.json();
    console.log('Reset password response:', data);
    return data;
  } catch (error) {
    console.error('Password reset failed:', error);
  }
}

/**
 * Refresh token example
 */
async function refreshToken() {
  try {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      console.error('No token found. Please login first.');
      return;
    }
    
    const response = await fetch(`${API_URL}/team/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    console.log('Token refresh response:', data);
    
    // Update the token
    if (data.data && data.data.token) {
      localStorage.setItem('accessToken', data.data.token);
    }
    
    return data;
  } catch (error) {
    console.error('Token refresh failed:', error);
  }
}

/**
 * Logout example
 */
async function logout() {
  try {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      console.error('No token found. Please login first.');
      return;
    }
    
    const response = await fetch(`${API_URL}/team/auth/revoke-token`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    console.log('Logout response:', data);
    
    // Clear the token
    localStorage.removeItem('accessToken');
    
    return data;
  } catch (error) {
    console.error('Logout failed:', error);
  }
}

// Example usage
async function runAuthExamples() {
  // First register a new user
  await register();
  
  // Then login
  const loginResult = await login();
  
  if (loginResult && loginResult.success) {
    // Try other operations
    await refreshToken();
    await logout();
  }
}

// Uncomment to run the examples
// runAuthExamples();

