# Start both backend and frontend applications

# Set error action to continue so script doesn't exit on error
$ErrorActionPreference = "Continue"

Write-Host "Starting LifeWeaver application..." -ForegroundColor Green
Write-Host "✨ Premium UI features included: animated typography, micro-interactions, and visual enhancements ✨" -ForegroundColor Magenta

# Function to check if a port is in use
function Test-Port {
    param($Port)
    $process = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
    return $process -ne $null
}

# Stop any running servers on our ports if they exist
Write-Host "Checking for existing processes..."
if (Test-Port 5000) {
    Write-Host "Process already using port 5000 (backend). Attempting to stop it..." -ForegroundColor Yellow
    Get-Process | Where-Object {$_.MainWindowTitle -like '*Flask*'} | Stop-Process -Force
}
if (Test-Port 3000) {
    Write-Host "Process already using port 3000 (frontend). Attempting to stop it..." -ForegroundColor Yellow
    Get-Process | Where-Object {$_.Name -like '*node*'} | Stop-Process -Force
}

# Define paths
$rootDir = $PSScriptRoot
$backendDir = Join-Path -Path $rootDir -ChildPath "backend"
$frontendDir = Join-Path -Path $rootDir -ChildPath "frontend"

# Start backend
Write-Host "Starting backend server..." -ForegroundColor Cyan
cd $backendDir

# Activate virtual environment and start backend
if (Test-Path -Path "venv\Scripts\activate.ps1") {
    & .\venv\Scripts\activate.ps1
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendDir'; & .\venv\Scripts\activate.ps1; python app.py"
    Write-Host "Backend server started at http://localhost:5000" -ForegroundColor Green
} else {
    Write-Host "Virtual environment not found. Please ensure you've set up the backend properly." -ForegroundColor Red
    exit 1
}

# Wait a moment to ensure backend has started
Start-Sleep -Seconds 3

# Start frontend
Write-Host "Starting frontend application..." -ForegroundColor Cyan
cd $frontendDir

# Start frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendDir'; npm start"
Write-Host "Frontend application started at http://localhost:3000" -ForegroundColor Green

# Open both in browser
Start-Sleep -Seconds 3
Start-Process "http://localhost:3000"

Write-Host "LifeWeaver application launched successfully!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Green
Write-Host "Backend API: http://localhost:5000" -ForegroundColor Green
Write-Host "Premium UI features are now active ✨" -ForegroundColor Magenta
Write-Host "Press Ctrl+C in respective terminal windows to stop the servers." -ForegroundColor Yellow 