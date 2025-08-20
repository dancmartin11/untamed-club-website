@echo off
echo.
echo ========================================
echo    Untamed Club - Development Start
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error: Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Check if npm is available
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error: npm is not available!
    echo Please ensure npm is properly installed with Node.js
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are available
echo.

REM Check if dependencies are installed
if not exist "node_modules" (
    echo 📦 Installing frontend dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install frontend dependencies!
        pause
        exit /b 1
    )
    echo ✅ Frontend dependencies installed
) else (
    echo ✅ Frontend dependencies already installed
)

REM Check if backend dependencies are installed
if exist "backend" (
    if not exist "backend\node_modules" (
        echo 📦 Installing backend dependencies...
        cd backend
        npm install
        if %errorlevel% neq 0 (
            echo ❌ Failed to install backend dependencies!
            pause
            exit /b 1
        )
        cd ..
        echo ✅ Backend dependencies installed
    ) else (
        echo ✅ Backend dependencies already installed
    )
)

echo.
echo 🚀 Starting development environment...
echo.
echo Frontend will be available at: http://localhost:3000
echo Backend will be available at: http://localhost:5000
echo.
echo Press Ctrl+C to stop both servers
echo.

REM Start the development environment
npm run dev

pause
