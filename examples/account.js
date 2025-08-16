/**
 * Example usage of the Account API endpoints
 */

// Using fetch for examples (in a browser or Node.js with node-fetch)
const API_URL = 'http://localhost:3000/api';

// Helper function to get the stored token
function getToken() {
  return localStorage.getItem('accessToken');
}

/**
 * Register a new team member example
 */
async function registerMember(twoFactorCode) {
  try {
    const token = getToken();
    
    if (!token) {
      console.error('No token found. Please login first.');
      return;
    }
    
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    // Add 2FA code if provided
    if (twoFactorCode) {
      headers['2FA'] = twoFactorCode;
    }
    
    const response = await fetch(`${API_URL}/team/account/members/register`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        first_name: 'Jane',
        last_name: 'Smith',
        middle_name: '',
        email: 'jane.smith@example.com'
      })
    });
    
    const data = await response.json();
    console.log('Register member response:', data);
    return data;
  } catch (error) {
    console.error('Member registration failed:', error);
  }
}

/**
 * Add an existing user as a team member example
 */
async function addMember(email, twoFactorCode) {
  try {
    const token = getToken();
    
    if (!token) {
      console.error('No token found. Please login first.');
      return;
    }
    
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    // Add 2FA code if provided
    if (twoFactorCode) {
      headers['2FA'] = twoFactorCode;
    }
    
    const response = await fetch(`${API_URL}/team/account/members/add`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email })
    });
    
    const data = await response.json();
    console.log('Add member response:', data);
    return data;
  } catch (error) {
    console.error('Add member failed:', error);
  }
}

/**
 * Get all team members example
 */
async function getAllMembers() {
  try {
    const token = getToken();
    
    if (!token) {
      console.error('No token found. Please login first.');
      return;
    }
    
    const response = await fetch(`${API_URL}/team/account/members`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    console.log('All members:', data);
    return data;
  } catch (error) {
    console.error('Get all members failed:', error);
  }
}

/**
 * Remove a team member example
 */
async function removeMember(memberId, twoFactorCode) {
  try {
    const token = getToken();
    
    if (!token) {
      console.error('No token found. Please login first.');
      return;
    }
    
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    
    // Add 2FA code if provided
    if (twoFactorCode) {
      headers['2FA'] = twoFactorCode;
    }
    
    const response = await fetch(`${API_URL}/team/account/members/${memberId}`, {
      method: 'DELETE',
      headers
    });
    
    const data = await response.json();
    console.log('Remove member response:', data);
    return data;
  } catch (error) {
    console.error('Remove member failed:', error);
  }
}

/**
 * Setup 2FA example
 */
async function setup2FA() {
  try {
    const token = getToken();
    
    if (!token) {
      console.error('No token found. Please login first.');
      return;
    }
    
    const response = await fetch(`${API_URL}/team/account/2fa`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    console.log('2FA setup response:', data);
    return data;
  } catch (error) {
    console.error('2FA setup failed:', error);
  }
}

/**
 * Get account credits example
 */
async function getCredits() {
  try {
    const token = getToken();
    
    if (!token) {
      console.error('No token found. Please login first.');
      return;
    }
    
    const response = await fetch(`${API_URL}/team/account/credits`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    console.log('Credits:', data);
    return data;
  } catch (error) {
    console.error('Get credits failed:', error);
  }
}

/**
 * Buy credits example
 */
async function buyCredits(amount) {
  try {
    const token = getToken();
    
    if (!token) {
      console.error('No token found. Please login first.');
      return;
    }
    
    const response = await fetch(`${API_URL}/team/account/credits`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount })
    });
    
    const data = await response.json();
    console.log('Buy credits response:', data);
    return data;
  } catch (error) {
    console.error('Buy credits failed:', error);
  }
}

/**
 * Change password example
 */
async function changePassword(oldPassword, newPassword, confirmPassword, twoFactorCode) {
  try {
    const token = getToken();
    
    if (!token) {
      console.error('No token found. Please login first.');
      return;
    }
    
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    // Add 2FA code if provided
    if (twoFactorCode) {
      headers['2FA'] = twoFactorCode;
    }
    
    const response = await fetch(`${API_URL}/team/account/change-password`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword
      })
    });
    
    const data = await response.json();
    console.log('Change password response:', data);
    return data;
  } catch (error) {
    console.error('Change password failed:', error);
  }
}

// Example usage
async function runAccountExamples() {
  // First get all members
  const members = await getAllMembers();
  
  // Then get credits
  await getCredits();
  
  // Setup 2FA
  await setup2FA();
  
  // Register a new member (requires 2FA)
  await registerMember('123456');
}

// Uncomment to run the examples
// runAccountExamples();

