from flask import Flask, render_template, request, jsonify
from chatbot import ask_gpt

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json() or {}
    message = data.get('message', '').strip()
    if not message:
        return jsonify({'answer': "Question vide"}), 400
    try:
        answer = ask_gpt(message)
    except Exception as e:
        answer = f"Erreur: {e}"
    return jsonify({'answer': answer})

if __name__ == '__main__':
    app.run(debug=True)
