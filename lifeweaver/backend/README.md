# Life Weaver Backend

This is the backend for the Life Weaver application, which uses Google's Gemini AI model to generate personalized autobiographies.

## Setup

1. Create a virtual environment and activate it:
   ```
   python -m venv venv
   venv\Scripts\activate  # On Windows
   source venv/bin/activate  # On Unix/MacOS
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Create a `.env` file based on `.env.example` and add your Google API key:
   ```
   GOOGLE_API_KEY=your_actual_api_key
   ```

4. Run the application:
   ```
   python app.py
   ```

## API Endpoints

- `GET /api/health`: Health check endpoint
- `POST /api/generate`: Generate an autobiography
  - Request body:
    ```json
    {
      "milestones": ["Born in 1990", "Graduated college in 2012", "Started a business in 2015"],
      "tone": "professional"
    }
    ```
  - Response:
    ```json
    {
      "autobiography": "Generated autobiography text..."
    }
    ``` 