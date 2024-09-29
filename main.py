from flask import Flask, request, render_template     # flask ==> create web application  || request ==> to get data from form || render_template ==> to render html file
import pyttsx3

app = Flask(__name__)                                 # create flask application object

@app.route('/')                                       # route for home page
def index():
    return render_template('index.html')

@app.route('/speak', methods=['POST'])
def speak():
    text = request.form['text']
    engine = pyttsx3.init()
    engine.say(text)
    engine.runAndWait()
    return render_template('index.html', message="Text has been spoken!")

if __name__ == '__main__':                            # insure app runs when script is executed
    app.run(debug=True) 
