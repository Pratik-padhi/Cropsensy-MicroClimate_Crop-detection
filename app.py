
from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

from flask_cors import CORS
CORS(app)

model = joblib.load("model.pkl")

@app.route("/")
def home():
    return "Crop Prediction API Running"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        features = [
            float(data["N"]),
            float(data["P"]),
            float(data["K"]),
            float(data["temperature"]),
            float(data["humidity"]),
            float(data["ph"]),
            float(data["rainfall"])
        ]

        prediction = model.predict([features])[0]

        return jsonify({
            "recommended_crop": str(prediction)
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        })
    
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)