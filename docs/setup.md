# Setup Guide

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account and project
- Git

## Initial Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TodoWebapp
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

4. **Supabase Setup**
   - Create a new project at [supabase.com](https://supabase.com)
   - Get your project URL and API keys
   - Run the database migrations (if provided)
   - Enable Row Level Security

## Development

### Starting the Backend
```bash
cd backend
npm run dev
# Server will start on http://localhost:3001
```

### Starting the Frontend
```bash
cd frontend
npm start
# App will open on http://localhost:3000
```

### Database Migrations
```bash
# If using Supabase CLI
supabase db push
```

## Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## Production Deployment

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
# Deploy the build/ directory to your hosting provider
```

## Troubleshooting

### Common Issues

1. **Supabase Connection Failed**
   - Check your `.env` file has correct credentials
   - Verify Supabase project is active
   - Check network connectivity

2. **Port Already in Use**
   - Change the PORT in `.env`
   - Kill processes using the port: `lsof -ti:3001 | xargs kill`

3. **Database Errors**
   - Ensure migrations are run
   - Check RLS policies
   - Verify table schemas

### Logs
- Backend logs: Check terminal output or log files
- Frontend logs: Browser developer console
- Database logs: Supabase dashboard

## Support

For issues or questions:
- Check the documentation in `docs/`
- Open an issue on GitHub
- Contact the development team
