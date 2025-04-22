from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure the Google Generative AI API
api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=api_key)

# Initialize the model
model = genai.GenerativeModel('gemini-1.5-flash')

app = Flask(__name__)
CORS(app)

@app.route('/api/generate', methods=['POST'])
def generate_autobiography():
    data = request.json
    milestones = data.get('milestones', [])
    tone = data.get('tone', 'professional')
    
    # Construct the prompt
    prompt = f"""
    Generate a personalized autobiography based on the following milestones in a {tone} tone:
    
    {', '.join(milestones)}
    
    Please weave these milestones into a compelling narrative that tells this person's life story.
    """
    
    try:
        response = model.generate_content(prompt)
        return jsonify({'autobiography': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(debug=True) 