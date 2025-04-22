# LifeWeaver - AI Autobiography Generator

LifeWeaver is a sophisticated web application that helps users generate personalized autobiographies based on their life milestones and preferred tone. Powered by Google's Gemini AI, it creates compelling narratives that weave together your life experiences into a coherent story.

![LifeWeaver Screenshot](screenshot.jpg)

## Features

- **Milestone Input**: Add your life's key events one by one
- **Tone Selection**: Choose from Professional, Emotional, Poetic, or Humorous tones
- **Real-time Generation**: Create your autobiography with a click
- **Modern UI**: Clean, premium interface with light and dark mode
- **Export Options**: Copy or download your generated story

## Tech Stack

### Frontend
- React with TypeScript
- TailwindCSS for styling
- Framer Motion for animations
- Responsive design

### Backend
- Python Flask API
- Google Gemini AI integration
- RESTful architecture

## Setup and Installation

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd lifeweaver/backend
   ```

2. Create and activate a virtual environment:
   ```
   python -m venv venv
   venv\Scripts\activate  # On Windows
   source venv/bin/activate  # On Unix/MacOS
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Create a `.env` file with your Google API key:
   ```
   GOOGLE_API_KEY=your_api_key_here
   ```

5. Run the Flask server:
   ```
   python app.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd lifeweaver/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

## Usage

1. Enter your life milestones (e.g., "Born in 1990", "Graduated college in 2012")
2. Select your preferred tone for the story
3. Click "Generate Autobiography"
4. View, copy, or download your personalized life story

## License

MIT 