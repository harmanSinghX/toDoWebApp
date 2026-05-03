# Todo Webapp

A full-stack todo application with separate frontend, backend, and database components.

## Project Structure

```
TodoWebapp/
├── frontend/          # Frontend application (React/Vue/Angular)
├── backend/           # Backend API (Node.js/Express/Python)
├── database/          # Database schemas and migrations
├── docs/              # Documentation
├── .vscode/           # VSCode configuration
├── .env.example       # Environment variables template
└── README.md          # This file
```

## Components

### Frontend
- User interface for managing todos
- Technologies: React, Vue.js, or Angular
- Features: Add, edit, delete, mark complete todos

### Backend
- RESTful API for todo operations
- Authentication and authorization
- Technologies: Node.js with Express, Python with FastAPI, etc.

### Database
- Data storage for todos and users
- Using Supabase (PostgreSQL)
- Tables: users, todos, categories

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TodoWebapp
   ```

2. **Environment Setup**
   - Copy `.env.example` to `.env`
   - Fill in your Supabase credentials and other environment variables

3. **Backend Setup**
   ```bash
   cd backend
   npm install  # or pip install for Python
   npm start    # or python app.py
   ```

4. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

5. **Database Setup**
   - Ensure Supabase project is configured
   - Run migrations if any

## API Endpoints

- `GET /todos` - Get all todos
- `POST /todos` - Create a new todo
- `PUT /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License
