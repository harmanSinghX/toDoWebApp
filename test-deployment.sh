#!/bin/bash

# Test script to verify deployment
echo "🧪 Testing Todo Webapp Deployment"
echo "==================================="

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Configuration - Update these URLs after deployment
BACKEND_URL="http://localhost:3001"  # Change to your deployed backend URL
FRONTEND_URL="http://localhost:3000"  # Change to your deployed frontend URL

print_status() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

# Test backend health
test_backend() {
    echo "Testing backend API..."

    # Health check
    if curl -s "$BACKEND_URL/api/health" > /dev/null; then
        print_status "Backend health check passed"
    else
        print_error "Backend health check failed"
        return 1
    fi

    # Test user registration (optional)
    echo "Testing user registration..."
    REGISTER_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/auth/register" \
        -H "Content-Type: application/json" \
        -d '{"email":"test-deploy@example.com","password":"password123"}')

    if echo "$REGISTER_RESPONSE" | grep -q "successfully"; then
        print_status "User registration works"
    else
        print_warning "User registration returned: $REGISTER_RESPONSE"
    fi
}

# Test frontend
test_frontend() {
    echo "Testing frontend..."

    # Basic connectivity test
    if curl -s "$FRONTEND_URL" | grep -q "html"; then
        print_status "Frontend is accessible"
    else
        print_error "Frontend is not accessible"
        return 1
    fi
}

# Main test function
main() {
    echo "Please update the URLs in this script with your deployed URLs:"
    echo "BACKEND_URL: $BACKEND_URL"
    echo "FRONTEND_URL: $FRONTEND_URL"
    echo ""

    test_backend
    test_frontend

    echo ""
    print_status "Testing complete! Check the results above."
    echo ""
    echo "Manual testing checklist:"
    echo "1. Open frontend URL in browser"
    echo "2. Try registering a new user"
    echo "3. Login with test credentials"
    echo "4. Create, edit, and delete todos"
    echo "5. Test category management"
}

main "$@"
