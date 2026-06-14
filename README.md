<div align="center">

# 🌾 Cropsensy
### Microclimate-Aware Crop Prediction & Agricultural Decision Support

**Tell us your soil. We'll tell you what to grow.**

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-cropsensy.netlify.app-2ea44f?style=for-the-badge)](https://cropsensy.netlify.app)
[![Made with Python](https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-ML-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org)
[![Netlify](https://img.shields.io/badge/Deployed%20on-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://cropsensy.netlify.app)

</div>

---

## 🌐 Try It Live

> **No setup. No code. Just results.**

👉 **[cropsensy.netlify.app](https://cropsensy.netlify.app)**

Cropsensy is deployed as a fully interactive web application. Open it on any device, input your soil nutrient values using the sliders, and get an instant crop recommendation — powered by a trained ensemble ML model under the hood. It even **auto-detects your location and live weather data** so you don't have to manually enter temperature, humidity, or rainfall.

---

## 🧩 What Problem Does This Solve?

Farmers and agronomists often rely on intuition or outdated almanacs when deciding what to plant. Wrong crop choices — even in otherwise good soil — can devastate an entire season.

Cropsensy brings ML-driven precision to this decision. By combining **real-time microclimate data** (temperature, humidity, rainfall) with **soil nutrient profiles** (N, P, K, pH), it recommends the crop most likely to thrive in those exact conditions — not just generically, but for *your* field, *right now*.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🌍 **Live Location Detection** | Auto-fetches your coordinates and real-time weather via browser geolocation |
| 🎛️ **Interactive Sliders** | Manually adjust N, P, K, Temperature, Humidity, pH, and Rainfall |
| 🌱 **Crop Prediction** | Classifies the best crop from 22 types with confidence score |
| 🧪 **Soil Diagnosis** | Rule-based engine that flags nutrient deficiencies and pH imbalance |
| 💊 **Fertilizer Recommendations** | Tells you what to apply, how much, and when — per predicted crop |
| 📱 **Works Everywhere** | Responsive UI, accessible on mobile and desktop |

---

## 🌱 Crops Covered

Cropsensy can recommend across **22 crop types**, spanning cereals, pulses, fruits, and cash crops:

`Rice` · `Maize` · `Chickpea` · `Kidney Beans` · `Pigeon Peas` · `Moth Beans` · `Mung Bean` · `Black Gram` · `Lentil` · `Pomegranate` · `Banana` · `Mango` · `Grapes` · `Watermelon` · `Muskmelon` · `Apple` · `Orange` · `Papaya` · `Coconut` · `Cotton` · `Jute` · `Coffee`

---

## 🧠 How the Model Works

The prediction engine is a **Stacking Ensemble Classifier** — a technique that layers multiple models so their combined judgment is more accurate than any single one.

```
Your Input (N, P, K, Temp, Humidity, pH, Rainfall)
         │
         ▼
   Feature Engineering
   (9 interaction features: NPK ratios, pH-nutrient products, Temp × Rainfall, etc.)
         │
         ▼
  StandardScaler (Normalization)
         │
         ▼
┌────────────────────────────────────┐
│          Base Learners             │
│   Random Forest  (100 estimators)  │
│   Decision Tree                    │
│   Logistic Regression              │
└──────────────┬─────────────────────┘
               │  5-Fold CV meta-features
               ▼
     Meta Learner: Logistic Regression
               │
               ▼
     🌾 Predicted Crop + Confidence
```

### Why Stacking?
A single model can be brittle. Random Forests are great with noisy data; Decision Trees catch hierarchical patterns; Logistic Regression provides a calibrated linear baseline. Stacking lets the meta-learner *learn* which base model to trust for which type of input — giving more robust predictions across diverse soil profiles.

---

## 📈 Model Performance

| Metric | Result |
|---|---|
| 🎯 Training Accuracy | **98.5%** |
| ✅ Test Accuracy | **96.8%** |
| 🔁 CV Mean Accuracy | **96.5%** |
| 📉 CV Std Dev | **± 0.8%** |
| 📐 Train/Test Split | 80 / 20 (stratified) |
| 🔄 Cross-Validation | 5-Fold Stratified KFold |

Minimal overfitting gap between training and test accuracy confirms the model generalizes well to unseen field conditions.

---

## 📊 Input Features

### Raw Inputs
| Feature | Unit | Description |
|---|---|---|
| `N` | mg/kg | Nitrogen content in soil |
| `P` | mg/kg | Phosphorus content in soil |
| `K` | mg/kg | Potassium content in soil |
| `Temperature` | °C | Ambient temperature |
| `Humidity` | % | Relative humidity |
| `pH` | — | Soil pH value |
| `Rainfall` | mm | Annual rainfall |

### Engineered Features (auto-derived)
`Temp_Humidity` · `N_P_ratio` · `N_K_ratio` · `P_K_ratio` · `NPK_sum` · `pH_N` · `pH_P` · `pH_K` · `Temp_Rainfall`

---

## 🗂️ Repository Structure

```
Cropsensy/
├── Cropsensy.py                             # Full training pipeline (Colab notebook export)
├── microclimate_crop_prediction_model.pkl   # Trained model pipeline (generated on run)
├── model_metadata.pkl                       # Version info, accuracy, feature list
└── README.md
```

---

## 🚀 Run It Yourself

### 1. Install dependencies

```bash
pip install pandas numpy scikit-learn matplotlib seaborn joblib
```

### 2. Train the model

Open `Cropsensy.py` in Google Colab, mount your Drive, point to your dataset, and run all cells. The trained pipeline saves automatically as `model.pkl`.

```python
# Update dataset path in the notebook:
df = pd.read_csv('/content/drive/MyDrive/.../final_raw_microclimate_dataset.csv')
```

### 3. Run inference

```python
import joblib

pipeline = joblib.load('microclimate_crop_prediction_model.pkl')

result = complete_agricultural_recommendation_fixed({
    'N': 45, 'P': 35, 'K': 30,
    'temperature': 25.5, 'humidity': 65.0,
    'ph': 6.2, 'rainfall': 150.0,
    # ... extended microclimate features
})

print(f"Recommended Crop : {result['prediction'].upper()}")
print(f"Confidence       : {result['confidence']:.2f}%")
print(f"Soil Status      : {result['soil_diagnosis']['status']}")
```

Or just skip all of this and use **[cropsensy.netlify.app](https://cropsensy.netlify.app)** directly. 🌐

---

## 🛠️ Tech Stack

| Layer | Tools |
|---|---|
| ML & Data | Python · scikit-learn · pandas · NumPy |
| Visualization | matplotlib · seaborn |
| Model Export | joblib |
| Training Environment | Google Colab |
| Deployment | Netlify |

---

## 👤 Author

**Pratik Padhi**
B.Tech · Data Science & AI · Centurion University of Technology and Management, Bhubaneswar
Research Publication: ICCAIML 2026

[![GitHub](https://img.shields.io/badge/GitHub-Pratik--padhi-181717?style=flat-square&logo=github)](https://github.com/Pratik-padhi)
[![Live App](https://img.shields.io/badge/Live%20App-cropsensy.netlify.app-2ea44f?style=flat-square)](https://cropsensy.netlify.app)

---

<div align="center">

*Built with the belief that better data leads to better harvests.*

**[🌾 Open Cropsensy](https://cropsensy.netlify.app)**

</div>
