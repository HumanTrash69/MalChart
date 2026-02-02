@echo off
REM MalChart - Automated Setup Script for Windows
REM This script will install dependencies and start the application

echo =============================
echo MalChart - Automated Setup
echo =============================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js is installed
node --version
echo [OK] npm is installed
npm --version
echo.

REM Step 1: Install frontend dependencies
echo =============================
echo Step 1/4: Installing frontend dependencies...
echo =============================
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
echo [OK] Frontend dependencies installed!
echo.

REM Step 2: Install backend dependencies
echo =============================
echo Step 2/4: Installing backend dependencies...
echo =============================
cd server
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..
echo [OK] Backend dependencies installed!
echo.

REM Step 3: Setup environment files
echo =============================
echo Step 3/4: Setting up configuration files...
echo =============================

REM Frontend .env
if not exist .env (
    if exist .env.example (
        copy .env.example .env >nul
        echo [OK] Created .env file
    ) else (
        echo REACT_APP_API_URL=http://localhost:5000/api > .env
        echo REACT_APP_USE_BACKEND=true >> .env
        echo [OK] Created .env file
    )
) else (
    echo [INFO] .env file already exists
)

REM Backend .env
if not exist server\.env (
    if exist server\.env.example (
        copy server\.env.example server\.env >nul
        echo [OK] Created server/.env file
    ) else (
        echo PORT=5000 > server\.env
        echo NODE_ENV=development >> server\.env
        echo CACHE_DURATION=24 >> server\.env
        echo [OK] Created server/.env file
    )
) else (
    echo [INFO] server/.env file already exists
)
echo.

REM Step 4: Start the application
echo =============================
echo Step 4/4: Starting MalChart...
echo =============================
echo.
echo Setup Complete!
echo.
echo Starting servers...
echo - Backend will run on http://localhost:5000
echo - Frontend will run on http://localhost:3000
echo.
echo Two windows will open:
echo 1. Backend Server
echo 2. Frontend App
echo.
echo Close both windows to stop the servers.
echo.
pause

REM Start backend in new window
echo Starting backend server...
start "MalChart Backend" cmd /k "cd server && npm start"

REM Wait a bit for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend in new window
echo Starting frontend...
start "MalChart Frontend" cmd /k "set BROWSER=none && npm start"

REM Wait a bit for frontend to start
timeout /t 5 /nobreak >nul

echo.
echo =============================
echo MalChart is starting!
echo =============================
echo.
echo Opening browser...
start http://localhost:3000
echo.
echo Both servers are running in separate windows.
echo Close those windows to stop the servers.
echo.
pause
