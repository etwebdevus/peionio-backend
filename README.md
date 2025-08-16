# Peionio API Client

A Node.js backend that interfaces with the Peionio API. This project provides a structured way to interact with all Peionio API endpoints, handling authentication, error management, and request/response formatting.

## Features

- Complete implementation of all Peionio API endpoints
- Token-based authentication with automatic refresh
- 2FA support for secure operations
- Comprehensive error handling
- Structured service-based architecture
- Express server with proper middleware configuration

## API Sections

The API client is organized into the following sections, mirroring the Peionio API structure:

1. **Authentication** - Login, registration, token management
2. **Account Management** - Team members, 2FA, credits
3. **Transactions** - Recent and historical transaction data
4. **Receiving Accounts** - Create and manage receiving accounts

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd peionio-api-client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration.

### Running the Server

Development mode:
```
npm run dev
```

Production mode:
```
npm start
```

## API Endpoints

### Authentication

- `POST /api/team/auth/login` - User login
- `POST /api/team/auth/register` - Register new user
- `GET /api/team/auth/verify-email/:token` - Verify email
- `POST /api/team/auth/resend-verification` - Resend verification email
- `POST /api/team/auth/forgot-password` - Request password reset
- `POST /api/team/auth/reset-password/:token` - Reset password
- `POST /api/team/auth/refresh-token` - Refresh authentication token
- `DELETE /api/team/auth/revoke-token` - Logout (revoke token)

### Account Management

- `POST /api/team/account/members/register` - Register new team member
- `POST /api/team/account/members/add` - Add existing user as team member
- `POST /api/team/account/members/verify/:token` - Verify team member
- `DELETE /api/team/account/members/:memberId` - Remove team member
- `GET /api/team/account/2fa` - Setup 2FA
- `GET /api/team/account/credits` - Get account credits
- `GET /api/team/account/members` - Get all team members
- `POST /api/team/account/2fa` - Reset 2FA
- `POST /api/team/account/credits` - Buy credits
- `POST /api/team/account/change-password` - Change password

### Transactions

- `GET /api/team/transactions/recent` - Get recent transactions
- `GET /api/team/transactions` - Get all transactions with optional filters

### Receiving Accounts

- `POST /api/team/receiving-accounts` - Create receiving account
- `PUT /api/team/receiving-accounts` - Update receiving account
- `GET /api/team/receiving-accounts` - Get all receiving accounts
- `GET /api/team/receiving-accounts/:receivingAccountId` - Get specific receiving account
- `POST /api/team/receiving-accounts/reactivate/:receivingAccountId` - Reactivate receiving account
- `POST /api/team/receiving-accounts/extend/:receivingAccountId` - Extend receiving account

## Authentication

Most endpoints require authentication via a Bearer token. Some sensitive operations also require 2FA authentication via a `2FA` header.

Example authenticated request:
```javascript
const response = await fetch('/api/team/account/members', {
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
    'Content-Type': 'application/json'
  }
});
```

Example 2FA request:
```javascript
const response = await fetch('/api/team/account/members/register', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
    '2FA': 'YOUR_2FA_CODE',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com'
  })
});
```

## Error Handling

The API client provides standardized error responses with appropriate HTTP status codes and descriptive messages.

Example error response:
```json
{
  "success": false,
  "status": 400,
  "message": "Email and password are required"
}
```

## License

[ISC License](LICENSE)

