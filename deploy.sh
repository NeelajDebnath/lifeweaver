#!/bin/bash

# LifeWeaver Deployment Script
# This script builds and deploys the LifeWeaver application

echo "Starting LifeWeaver deployment..."

# Build the frontend
echo "Building frontend..."
cd lifeweaver/frontend
npm install
npm run build
echo "Frontend build complete."

# Set up the backend
echo "Setting up backend..."
cd ../backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
source venv/bin/activate || source venv/Scripts/activate

# Install backend dependencies
echo "Installing backend dependencies..."
pip install -r requirements.txt

# Check if .env file exists, if not create from example
if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "Please update the .env file with your Google API key."
fi

echo "Backend setup complete."

# Return to root directory
cd ../..

echo "Deployment preparation complete."
echo "To start the application:"
echo "1. Update the .env file in the backend directory with your Google API key"
echo "2. Start the backend server: cd lifeweaver/backend && python app.py"
echo "3. Serve the frontend build: cd lifeweaver/frontend && npx serve -s build"

echo "Deployment complete!" 