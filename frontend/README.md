# Todo Webapp Frontend

A modern React frontend for the Todo Webapp with authentication, todo management, and category organization.

## Features

- 🔐 **Authentication**: Sign up, sign in, and password reset
- ✅ **Todo Management**: Create, read, update, and delete todos
- 📁 **Categories**: Organize todos with custom categories
- 🎨 **Modern UI**: Clean, responsive design with smooth animations
- 🔄 **Real-time**: Live updates using Supabase real-time subscriptions
- 📱 **Responsive**: Works on desktop and mobile devices

## Tech Stack

- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Supabase** - Backend-as-a-Service for auth and database
- **CSS3** - Custom styling with modern CSS features
- **React Icons** - Beautiful icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account and project

### Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
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
   npm start
   ```

   The app will open at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
frontend/
├── public/
│   ├── index.html          # Main HTML template
│   └── manifest.json       # PWA manifest
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Header.js       # App header with navigation
│   │   ├── TodoForm.js     # Form for creating todos
│   │   ├── TodoItem.js     # Individual todo item
│   │   ├── TodoList.js     # List of todos
│   │   └── CategoryManager.js # Category management
│   ├── pages/              # Page components
│   │   ├── Login.js        # Authentication page
│   │   └── Dashboard.js    # Main app dashboard
│   ├── hooks/              # Custom React hooks
│   │   └── useAuth.js      # Authentication hook
│   ├── utils/              # Utility functions
│   │   └── supabaseClient.js # Supabase client setup
│   ├── styles/             # CSS stylesheets
│   ├── App.js              # Main app component
│   └── index.js            # App entry point
└── package.json            # Dependencies and scripts
```

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Environment Variables

Create a `.env` file in the root directory with:

```env
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Features in Detail

### Authentication
- Email/password sign up and sign in
- Password reset functionality
- Automatic session management
- Protected routes

### Todo Management
- Create todos with title, description, priority, due date
- Mark todos as complete/incomplete
- Edit existing todos inline
- Delete todos with confirmation
- Filter by status (all, pending, completed)

### Categories
- Create custom categories with colors
- Assign todos to categories
- Filter todos by category
- Delete categories (todos become uncategorized)

### UI/UX
- Responsive design for all screen sizes
- Smooth animations and transitions
- Loading states and error handling
- Intuitive user interface
- Accessibility considerations

## Contributing

1. Follow the existing code style
2. Write clear, concise commit messages
3. Test your changes thoroughly
4. Update documentation as needed

## License

MIT License - see the main project README for details.
