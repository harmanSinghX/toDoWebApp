#!/bin/bash

echo "🚀 Todo Webapp Deployment Script"
echo "================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_dependencies() {
    print_status "Checking dependencies..."

    if ! command -v git &> /dev/null; then
        print_error "Git is not installed. Please install Git first."
        exit 1
    fi

    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js first."
        exit 1
    fi

    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi

    print_status "All dependencies are installed ✓"
}

# Backend deployment preparation
prepare_backend() {
    print_status "Preparing backend for deployment..."

    cd backend

    # Install dependencies
    npm install

    # Run tests if they exist
    if [ -f "package.json" ] && grep -q '"test"' package.json; then
        print_status "Running backend tests..."
        npm test || print_warning "Tests failed, but continuing with deployment"
    fi

    # Create production environment file
    if [ ! -f ".env.production" ]; then
        print_warning "Creating .env.production template..."
        cat > .env.production << EOL
# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Server Configuration
PORT=3001
NODE_ENV=production

# Frontend URL
FRONTEND_URL=your_frontend_url
EOL
        print_warning "Please edit .env.production with your actual values"
    fi

    cd ..
    print_status "Backend preparation complete ✓"
}

# Frontend deployment preparation
prepare_frontend() {
    print_status "Preparing frontend for deployment..."

    cd frontend

    # Install dependencies
    npm install

    # Run linting to catch issues early
    print_status "Running ESLint..."
    if npm run lint 2>/dev/null; then
        print_status "ESLint passed ✓"
    else
        print_warning "ESLint found issues. Please fix them before deployment."
        print_warning "Common fixes: remove unused imports, fix undefined variables"
    fi

    # Build the application
    print_status "Building frontend..."
    if npm run build; then
        print_status "Frontend build successful ✓"
    else
        print_error "Frontend build failed. Check the errors above."
        exit 1
    fi

    cd ..
    print_status "Frontend preparation complete ✓"
}

# Main deployment function
main() {
    print_status "Starting Todo Webapp deployment preparation..."

    check_dependencies
    prepare_backend
    prepare_frontend

    echo ""
    print_status "🎉 Deployment preparation complete!"
    echo ""
    print_status "Next steps:"
    echo "1. Backend: Push to Railway, Render, or your preferred platform"
    echo "2. Frontend: Push to Vercel, Netlify, or your preferred platform"
    echo "3. Update environment variables in both deployments"
    echo "4. Update CORS settings in backend for frontend domain"
    echo ""
    print_status "Happy deploying! 🚀"
}

# Run main function
main "$@"
