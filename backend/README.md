# Todo Webapp Backend

A robust Node.js/Express API backend for the Todo Webapp with authentication, todo management, and category organization.

## Features

- 🔐 **JWT Authentication**: Secure user authentication with Supabase
- ✅ **Todo CRUD**: Complete Create, Read, Update, Delete operations
- 📁 **Category Management**: Organize todos with custom categories
- 🛡️ **Security**: Rate limiting, input validation, CORS protection
- 📊 **Statistics**: Category usage statistics and analytics
- 🔍 **Filtering**: Advanced filtering and search capabilities
- 📝 **Validation**: Comprehensive input validation with Joi
- 🚀 **Performance**: Optimized queries and response times

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Supabase** - Backend-as-a-Service for database and auth
- **Joi** - Input validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

## Project Structure

```
backend/
├── routes/              # API route handlers
│   ├── auth.js         # Authentication endpoints
│   ├── todos.js        # Todo CRUD operations
│   └── categories.js   # Category management
├── middleware/         # Custom middleware
│   └── auth.js         # JWT authentication
├── utils/              # Utility functions
│   └── validation.js   # Input validation and helpers
├── server.js           # Main application entry point
├── package.json        # Dependencies and scripts
└── README.md           # This file
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account and project

### Installation

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp ../.env.example ../.env
   # Edit .env with your Supabase credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The API will be available at [http://localhost:3001](http://localhost:3001)

## Environment Variables

Create a `.env` file in the root directory with:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/me` | Get current user info |
| POST | `/api/auth/refresh` | Refresh access token |
| POST | `/api/auth/reset-password` | Send password reset email |

### Todos

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos (with filtering) |
| GET | `/api/todos/:id` | Get specific todo |
| POST | `/api/todos` | Create new todo |
| PUT | `/api/todos/:id` | Update todo |
| DELETE | `/api/todos/:id` | Delete todo |
| PATCH | `/api/todos/bulk` | Bulk update todos |

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Get all categories |
| GET | `/api/categories/:id` | Get specific category |
| POST | `/api/categories` | Create new category |
| PUT | `/api/categories/:id` | Update category |
| DELETE | `/api/categories/:id` | Delete category |
| GET | `/api/categories/:id/stats` | Get category statistics |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | API health check |

## API Usage Examples

### Authentication

```javascript
// Register
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});

// Login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});

const data = await response.json();
// Use data.session.access_token for authenticated requests
```

### Todos

```javascript
// Get todos with auth header
const response = await fetch('/api/todos', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});

// Create todo
const response = await fetch('/api/todos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  },
  body: JSON.stringify({
    title: 'Complete project',
    description: 'Finish the todo app',
    priority: 'high',
    due_date: '2024-12-31',
    category_id: 'category-uuid'
  })
});
```

### Filtering Todos

```javascript
// Get completed todos
const response = await fetch('/api/todos?completed=true', {
  headers: { 'Authorization': `Bearer ${accessToken}` }
});

// Get todos by category
const response = await fetch('/api/todos?category_id=category-uuid', {
  headers: { 'Authorization': `Bearer ${accessToken}` }
});

// Search todos
const response = await fetch('/api/todos?search=project', {
  headers: { 'Authorization': `Bearer ${accessToken}` }
});
```

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Prevents abuse with configurable limits
- **Input Validation**: Comprehensive validation with Joi schemas
- **CORS Protection**: Configured cross-origin policies
- **Helmet Security**: Security headers and protections
- **SQL Injection Prevention**: Parameterized queries via Supabase
- **XSS Protection**: Input sanitization

## Error Handling

The API returns consistent error responses:

```json
{
  "error": "Error message",
  "details": "Detailed error info (dev mode only)"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

## Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
```

## Deployment

### Environment Setup

1. Set environment variables in your deployment platform
2. Ensure Supabase project is properly configured
3. Run database migrations if needed

### Production Considerations

- Set `NODE_ENV=production`
- Use a process manager like PM2
- Configure reverse proxy (nginx)
- Set up monitoring and logging
- Enable HTTPS

## Contributing

1. Follow the existing code style
2. Write tests for new features
3. Update documentation
4. Use meaningful commit messages
5. Ensure all tests pass

## License

MIT License - see the main project README for details.
