# 🌾 Cropsensy — Microclimate-Based Crop Detection & Agricultural Decision Support System

> An end-to-end ML pipeline that predicts the optimal crop to grow based on real-time microclimate and soil parameters — with integrated soil diagnosis and fertilizer recommendations.

---

## 📌 Overview

**Cropsensy** is a machine learning system designed to assist farmers and agronomists in making data-driven decisions about crop selection. By analyzing a combination of microclimate conditions and soil nutrient profiles, the system predicts the best-suited crop and provides actionable soil health and fertilizer recommendations.

The project was developed and trained in Google Colab as a research-grade notebook (`Cropsensy.py`) and produces a deployable `.pkl` model artifact.

---

## 🧠 Features

- **Crop Prediction** — Classifies the optimal crop from 22 crop types based on environmental and soil inputs
- **Stacking Ensemble Model** — Combines Random Forest, Decision Tree, and Logistic Regression with a Logistic Regression meta-learner
- **Feature Engineering** — Generates 9 interaction features (NPK ratios, temperature-humidity composites, pH-nutrient products, etc.)
- **Soil Diagnosis** — Rule-based engine that evaluates nutrient deficiencies and pH suitability
- **Fertilizer Recommendation** — Suggests fertilizer type, quantity, and timing based on predicted crop and soil state
- **Complete Decision Support Pipeline** — End-to-end function combining prediction, soil diagnostics, and fertilizer output
- **Model Persistence** — Saves trained pipeline and metadata using `joblib` for deployment

---

## 🌱 Supported Crops

`rice` · `maize` · `chickpea` · `kidneybeans` · `pigeonpeas` · `mothbeans` · `mungbean` · `blackgram` · `lentil` · `pomegranate` · `banana` · `mango` · `grapes` · `watermelon` · `muskmelon` · `apple` · `orange` · `papaya` · `coconut` · `cotton` · `jute` · `coffee`

---

## 📊 Input Features

| Feature | Description |
|---|---|
| `N` | Nitrogen content in soil (mg/kg) |
| `P` | Phosphorus content in soil (mg/kg) |
| `K` | Potassium content in soil (mg/kg) |
| `Temperature` | Ambient temperature (°C) |
| `Humidity` | Relative humidity (%) |
| `pH` | Soil pH value |
| `Rainfall` | Annual rainfall (mm) |
| + Extended | Latitude, Longitude, WindSpeed, SolarRadiation, SoilMoisture, etc. |

**Engineered Features:** `Temp_Humidity`, `N_P_ratio`, `N_K_ratio`, `P_K_ratio`, `NPK_sum`, `pH_N`, `pH_P`, `pH_K`, `Temp_Rainfall`

---

## 🏗️ Model Architecture

```
Input Features
      │
      ▼
StandardScaler (Preprocessing)
      │
      ▼
┌─────────────────────────────────┐
│       Base Estimators           │
│  ┌───────────────────────────┐  │
│  │  Random Forest (100 trees)│  │
│  │  Decision Tree            │  │
│  │  Logistic Regression      │  │
│  └───────────────────────────┘  │
└────────────────┬────────────────┘
                 │  (5-Fold CV meta-features)
                 ▼
       Meta Learner: Logistic Regression
                 │
                 ▼
          Crop Prediction
```

---

## 📈 Model Performance

| Metric | Value |
|---|---|
| Training Accuracy | **98.5%** |
| Test Accuracy | **96.8%** |
| CV Mean Accuracy | **96.5%** |
| CV Std Dev | **±0.8%** |
| Train-Test Split | 80 / 20 (stratified) |
| Cross-Validation | 5-fold Stratified KFold |

---

## 🗂️ Project Structure

```
Cropsensy/
├── Cropsensy.py                            # Main training notebook (exported from Colab)
├── microclimate_crop_prediction_model.pkl  # Trained pipeline (generated on run)
├── model_metadata.pkl                      # Model metadata and version info
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

```bash
pip install pandas numpy scikit-learn matplotlib seaborn joblib
```

### Running the Notebook

1. Open `Cropsensy.py` in Google Colab or convert to `.ipynb`
2. Mount your Google Drive and update the dataset path:
   ```python
   df = pd.read_csv('/content/drive/MyDrive/Micro Climate/Dataset/.../final_raw_microclimate_dataset.csv')
   ```
3. Run all cells sequentially — the model trains and saves automatically

### Running Inference

```python
import joblib

pipeline = joblib.load('microclimate_crop_prediction_model.pkl')

# Sample prediction
test_input = {
    'N': 45, 'P': 35, 'K': 30,
    'temperature': 25.5, 'humidity': 65.0,
    'ph': 6.2, 'rainfall': 150.0,
    'Latitude': 20, 'Longitude': 86,
    'WindSpeed': 10, 'SolarRadiation': 200,
    'SoilMoisture': 30, ...
}

result = complete_agricultural_recommendation_fixed(test_input)
print(f"Recommended Crop: {result['prediction'].upper()}")
print(f"Confidence: {result['confidence']:.2f}%")
```

---

## 🔬 Pipeline Stages

1. **Data Loading** — CSV ingestion with fallback sample dataset generation
2. **EDA** — Crop distribution plots, feature histograms, correlation heatmap
3. **Preprocessing** — Duplicate removal, median imputation for missing values
4. **Feature Engineering** — 9 interaction features derived from core inputs
5. **Model Training** — Stacking Ensemble with 5-fold CV
6. **Evaluation** — Accuracy, Precision, Recall, F1, Confusion Matrix
7. **Feature Importance** — Extracted from the Random Forest base estimator
8. **Soil Diagnosis** — Rule-based nutrient and pH assessment
9. **Fertilizer Recommendation** — Crop-specific nutrient gap analysis
10. **Model Persistence** — `joblib` export of pipeline and metadata

---

## 🛠️ Tech Stack

| Layer | Tools |
|---|---|
| Language | Python 3.x |
| ML Framework | scikit-learn |
| Data | pandas, NumPy |
| Visualization | matplotlib, seaborn |
| Model Persistence | joblib |
| Environment | Google Colab |

---

## 👤 Author

**Pratik Padhi**  
B.Tech Student · Centurion University of Technology and Management, Bhubaneswar  
Applied AI & ML Engineer

[![GitHub](https://img.shields.io/badge/GitHub-Pratik--padhi-181717?logo=github)](https://github.com/Pratik-padhi)

---

## 📄 License

This project is open for academic and research use. Contact the author for commercial licensing.
