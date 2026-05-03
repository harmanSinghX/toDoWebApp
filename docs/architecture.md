# Todo Webapp Documentation

## Overview

This is a full-stack todo web application designed with a modular architecture separating concerns into frontend, backend, and database layers.

## Architecture

### Frontend Layer
- **Purpose**: User interface and client-side logic
- **Technologies**: Modern JavaScript frameworks (React, Vue, Angular)
- **Responsibilities**:
  - Rendering todo lists
  - Handling user interactions
  - Managing local state
  - Communicating with backend API

### Backend Layer
- **Purpose**: Business logic and API endpoints
- **Technologies**: Node.js/Express, Python/FastAPI, or similar
- **Responsibilities**:
  - Authentication and authorization
  - Data validation
  - Business logic processing
  - API routing and middleware

### Database Layer
- **Purpose**: Data persistence and management
- **Technology**: Supabase (PostgreSQL)
- **Components**:
  - User management
  - Todo items storage
  - Categories and tags
  - Real-time subscriptions

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Todos Table
```sql
CREATE TABLE todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  priority VARCHAR(20) DEFAULT 'medium',
  due_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Categories Table
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  color VARCHAR(7), -- hex color code
  user_id UUID REFERENCES users(id) ON DELETE CASCADE
);
```

## API Design

### Authentication
- JWT-based authentication
- Supabase Auth integration

### Endpoints
- `GET /api/todos` - Retrieve todos
- `POST /api/todos` - Create todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo
- `GET /api/categories` - Get categories
- `POST /api/categories` - Create category

## Security Considerations

- Input validation and sanitization
- CORS configuration
- Rate limiting
- Secure environment variable management
- Row Level Security (RLS) in Supabase

## Deployment

### Frontend
- Static hosting (Vercel, Netlify)
- Build process: `npm run build`

### Backend
- Server hosting (Heroku, Railway, AWS)
- Environment variables configuration

### Database
- Supabase cloud hosting
- Automatic backups and scaling
