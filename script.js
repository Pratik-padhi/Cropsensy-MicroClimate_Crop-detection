
// =============================
// 📍 LOCATION + MAP + WEATHER
// =============================
function initLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async pos => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;

            loadMap(lat, lon);
            fetchWeather(lat, lon);
        }, () => {
            console.log("Location permission denied");
        });
    }
}

// 🗺 Load Map
function loadMap(lat, lon) {
    const map = L.map('map').setView([lat, lon], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    L.marker([lat, lon]).addTo(map);
}

// 🌤 Fetch Weather
async function fetchWeather(lat, lon) {
    try {
        const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m`
        );

        const data = await res.json();

        const temp = data.current_weather.temperature;

        // humidity comes from hourly data (approx current)
        const humidity = data.hourly.relativehumidity_2m[0];

        document.getElementById("weatherBox").innerHTML =
            `🌡 ${temp}°C | 💧 ${humidity}% | 🌤 Live data`;

        // 🎛 auto-fill sliders
        document.getElementById("temperature").value = temp;
        document.getElementById("humidity").value = humidity;

        document.getElementById("temp_val").textContent = temp;
        document.getElementById("hum_val").textContent = humidity;

    } catch (err) {
        document.getElementById("weatherBox").innerHTML =
            "⚠️ Weather unavailable";
    }
}
// =============================
// 🎛 SLIDER VALUE UPDATES
// =============================
const sliders = ["N","P","K","temperature","humidity","ph","rainfall"];

const idMap = {
    temperature: "temp_val",
    humidity: "hum_val",
    rainfall: "rain_val"
};

sliders.forEach(id => {
    const slider = document.getElementById(id);
    const display = document.getElementById(idMap[id] || id + "_val");

    slider.oninput = () => {
        display.textContent = slider.value;
    };
});

// =============================
// 🧠 AI EXPLANATION
// =============================
function generateExplanation(data) {
    let explanation = [];

    if (data.temperature > 25) explanation.push("warm climate");
    if (data.humidity > 70) explanation.push("high humidity");
    if (data.rainfall > 150) explanation.push("heavy rainfall");
    if (data.ph >= 6 && data.ph <= 7) explanation.push("optimal soil pH");

    return explanation.length
        ? "Based on " + explanation.join(", ")
        : "Balanced growing conditions";
}

// =============================
// 📊 PREDICTION
// =============================
function predict() {
    const resultDiv = document.getElementById("result");
    resultDiv.classList.remove("show");

    const data = {
        N: document.getElementById("N").value,
        P: document.getElementById("P").value,
        K: document.getElementById("K").value,
        temperature: document.getElementById("temperature").value,
        humidity: document.getElementById("humidity").value,
        ph: document.getElementById("ph").value,
        rainfall: document.getElementById("rainfall").value
    };

    resultDiv.innerHTML = "⏳ Analyzing...";
    resultDiv.className = "loading show";

    fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
        if (res.error) {
            resultDiv.innerHTML = "❌ " + res.error;
            resultDiv.className = "error show";
            return;
        }

        const explanation = generateExplanation(data);

        resultDiv.innerHTML = `
            🌱 <b style="font-size:22px">${res.recommended_crop}</b><br>
            🧠 <small>${explanation}</small>
        `;

        resultDiv.className = "success show";
    })
    .catch(() => {
        resultDiv.innerHTML = "❌ Cannot connect to server";
        resultDiv.className = "error show";
    });
}

// =============================
// 🚀 INIT
// =============================
window.onload = initLocation;