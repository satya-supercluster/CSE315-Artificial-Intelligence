from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np
from network import Network
app = Flask(__name__)
CORS(app)
net = Network(size_layers=[784, 20, 10])
net.weights_inp_hid = np.loadtxt("./data/weights_inp_hid.csv", delimiter=',')
net.weights_hid_out = np.loadtxt("./data/weights_hid_out.csv", delimiter=',')
net.bias_hid = np.loadtxt("./data/bias_hid.csv", delimiter=',')
net.bias_out = np.loadtxt("./data/bias_out.csv", delimiter=',')
def recognize_digit(image, net):
    image = image.resize((28, 28)).convert('L')
    image = np.array(image).reshape(784) / 256
    net.feedfwd(image)
    return int(net.outputlayer.argmax())

# Route to handle digit recognition
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    image = Image.open(file.stream)
    prediction = recognize_digit(image, net)
    return jsonify({"predicted_digit": prediction})

if __name__ == "__main__":
    app.run(debug=True)
