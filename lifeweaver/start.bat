@echo off
echo Starting LifeWeaver application...
echo.
echo [Premium UI] Animated typography, micro-interactions, and visual enhancements included!
echo.

REM Start backend
echo Starting backend server...
cd /d "%~dp0backend"
start "LifeWeaver Backend" cmd /k "call venv\Scripts\activate.bat && python app.py"
echo Backend server started at http://localhost:5000
echo.

REM Wait a moment to ensure backend has started
timeout /t 3 > nul

REM Start frontend
echo Starting frontend application...
cd /d "%~dp0frontend"
start "LifeWeaver Frontend" cmd /k "npm start"
echo Frontend application started at http://localhost:3000
echo.

REM Wait a moment before opening browser
timeout /t 5 > nul

REM Open browser
echo Opening application in browser...
start http://localhost:3000

echo.
echo LifeWeaver application launched successfully!
echo Frontend: http://localhost:3000
echo Backend API: http://localhost:5000
echo [Premium UI] All visual enhancements are now active!
echo Press Ctrl+C in respective terminal windows to stop the servers.
echo. 