#!/bin/bash

# MalChart - Automated Setup Script for Mac/Linux
# This script will install dependencies and start the application

set -e  # Exit on error

echo "🚀 MalChart - Automated Setup"
echo "=============================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Step 1: Install frontend dependencies
echo "📦 Step 1/4: Installing frontend dependencies..."
npm install
echo "✅ Frontend dependencies installed!"
echo ""

# Step 2: Install backend dependencies
echo "📦 Step 2/4: Installing backend dependencies..."
cd server
npm install
cd ..
echo "✅ Backend dependencies installed!"
echo ""

# Step 3: Setup environment files
echo "🔧 Step 3/4: Setting up configuration files..."

# Frontend .env
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "✅ Created .env file"
    else
        echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
        echo "REACT_APP_USE_BACKEND=true" >> .env
        echo "✅ Created .env file"
    fi
else
    echo "ℹ️  .env file already exists"
fi

# Backend .env
if [ ! -f server/.env ]; then
    if [ -f server/.env.example ]; then
        cp server/.env.example server/.env
        echo "✅ Created server/.env file"
    else
        echo "PORT=5000" > server/.env
        echo "NODE_ENV=development" >> server/.env
        echo "CACHE_DURATION=24" >> server/.env
        echo "✅ Created server/.env file"
    fi
else
    echo "ℹ️  server/.env file already exists"
fi
echo ""

# Step 4: Start the application
echo "🚀 Step 4/4: Starting MalChart..."
echo ""
echo "=============================="
echo "✅ Setup Complete!"
echo "=============================="
echo ""
echo "Starting servers..."
echo "- Backend will run on http://localhost:5000"
echo "- Frontend will run on http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Function to kill background processes on exit
cleanup() {
    echo ""
    echo "Stopping servers..."
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    exit
}

trap cleanup INT TERM

# Start backend in background
echo "Starting backend server..."
cd server
npm start > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait a bit for backend to start
sleep 3

# Check if backend started successfully
if kill -0 $BACKEND_PID 2>/dev/null; then
    echo "✅ Backend server started (PID: $BACKEND_PID)"
else
    echo "❌ Backend failed to start. Check backend.log for errors."
    exit 1
fi

# Start frontend in background
echo "Starting frontend..."
BROWSER=none npm start &
FRONTEND_PID=$!

# Wait a bit for frontend to start
sleep 5

# Check if frontend started successfully  
if kill -0 $FRONTEND_PID 2>/dev/null; then
    echo "✅ Frontend started (PID: $FRONTEND_PID)"
    echo ""
    echo "=============================="
    echo "🎉 MalChart is running!"
    echo "=============================="
    echo ""
    echo "Open in browser: http://localhost:3000"
    echo ""
    echo "Both servers are running in the background."
    echo "Press Ctrl+C to stop everything."
    echo ""
    
    # Try to open browser
    if command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:3000 2>/dev/null || true
    elif command -v open &> /dev/null; then
        open http://localhost:3000 2>/dev/null || true
    fi
    
    # Keep script running
    wait
else
    echo "❌ Frontend failed to start."
    kill $BACKEND_PID 2>/dev/null || true
    exit 1
fi
