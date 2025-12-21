# Weather Dashboard 🌦️

A sleek, responsive weather forecasting application built with React and Vite. It provides real-time weather updates and a 5-day forecast using the OpenWeather API.

## 🚀 Features

* **Real-time Weather:** Get current temperature, wind speed, and weather conditions.
* **5-Day Forecast:** Detailed daily forecast visualized with custom icons.
* **Geolocation Support:** Automatically detects your current location to show local weather.
* **Search History:** Keeps track of your recent searches (stored in LocalStorage).
* **Responsive Design:** Fully optimized for mobile, tablet, and desktop views.
* **Skeleton Loading:** Smooth UI transitions with skeleton loaders during data fetching.

## 🛠️ Tech Stack

* **Frontend:** React.js, Vite
* **Styling:** CSS3 (Glassmorphism UI)
* **API:** [OpenWeatherMap API](https://openweathermap.org/api)
* **Deployment:** (e.g., Vercel / Netlify / GitHub Pages)

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/devsivv/weather-app.git](https://github.com/devsivv/weather-app.git)
   cd weather-app
Install dependencies:

Bash

npm install
Set up Environment Variables: Create a .env file in the root directory and add your OpenWeather API key:

Code snippet

VITE_WEATHER_API_KEY=your_api_key_here
Run the development server:

Bash

npm run dev
📂 Project Structure
Plaintext

src/
├── App.jsx              # Main application logic and state management
├── Webpage.jsx          # Current weather display and search functionality
├── ForecastWrapper.jsx   # 5-day forecast rendering and skeleton UI
├── Header.jsx           # App header component
├── Footer.jsx           # App footer component
├── index.css            # Global styles and layout
└── App.css              # Component-specific styles
🛡️ License
Distributed under the MIT License.

Built by Shivam Dubey


Would you like me to add a "How it Works" section explaining the data filtering logic for the 5-day forecast?