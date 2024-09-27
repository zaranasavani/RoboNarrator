from flask import Flask, render_template, request
import pyttsx3

app = Flask(__name__)

# Route for the home page
@app.route('/')
def index():
    return render_template('index.html')

# Route to handle speech conversion
@app.route('/speak', methods=['POST'])
def speak():
    text = request.form.get('text')
    if text:
        # Initialize text-to-speech engine inside the function to avoid runtime issues
        engine = pyttsx3.init()
        # Convert the text to speech
        engine.say(text)
        engine.runAndWait()
        engine.stop()  # Ensure the loop is stopped after use
    return render_template('index.html', message="Text has been spoken!")

if __name__ == '__main__':
    app.run(debug=True)
