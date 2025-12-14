import React, { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;


const MAX_HISTORY = 4;

function Webpage() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [history, setHistory] = useState(() => {
        try {
            const storedHistory = localStorage.getItem('weatherCityHistory');
            return storedHistory ? JSON.parse(storedHistory) : [];
        } catch (e) {
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('weatherCityHistory', JSON.stringify(history));
        } catch (e) {
        }
    }, [history]);

    const updateHistory = (newCity) => {
        const normalizedCity =
            newCity.trim().charAt(0).toUpperCase() + newCity.trim().slice(1).toLowerCase();

        const capitalize = (str) => {
            if (!str) return str;
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        };

        const capitalizedCity = capitalize(normalizedCity);
        const filteredHistory = history.filter(c => c.toUpperCase() !== normalizedCity.toUpperCase());

        const newHistory = [normalizedCity, ...filteredHistory].slice(0, MAX_HISTORY);

        setHistory(newHistory);
    };

    const fetchWeatherData = async (cityName) => {
        const normalizedCity = cityName.trim();
        if (!normalizedCity) return;

        setLoading(true);
        setError(null);
        setWeatherData(null);

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${normalizedCity}&appid=${API_KEY}&units=metric`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("City not found or API error.");
            }

            const data = await response.json();
            setWeatherData(data);

            updateHistory(normalizedCity);

        } catch (err) {
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const handleGetWeather = () => {
        fetchWeatherData(city);
    };

    const handleHistoryClick = (historyCity) => {
        setCity(historyCity);
        fetchWeatherData(historyCity);
    };

    const getWeatherUI = (weatherMain) => {
        switch (weatherMain) {
            case "Clear":
                return { icon: "☀️", color: "#facc15" };
            case "Clouds":
                return { icon: "☁️", color: "#60a5fa" };
            case "Rain":
                return { icon: "🌧️", color: "#38bdf8" };
            case "Snow":
                return { icon: "❄️", color: "#bae6fd" };
            case "Thunderstorm":
                return { icon: "⛈️", color: "#818cf8" };
            default:
                return { icon: "🌤️", color: "#94a3b8" };
        }
    };

    const WeatherSkeleton = () => (
        <div className="skeleton-card">
            <div className="skeleton-icon shimmer"></div>
            <div className="skeleton-title shimmer"></div>
            <div className="skeleton-temp shimmer"></div>
            <div className="skeleton-line shimmer"></div>
            <div className="skeleton-line shimmer"></div>
        </div>
    );


    return (
        <div className="weather-dashboard">
            <div className="container">
                <h1>Weather App</h1>

                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Enter city name"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleGetWeather();
                        }}
                        disabled={loading}
                    />


                </div>

                {history.length > 0 && (
                    <div className="history-container">
                        <p>Recent Searches:</p>
                        {history.map((histCity, index) => (
                            <button
                                key={index}
                                className="history-button"
                                onClick={() => handleHistoryClick(histCity)}
                            >
                                {histCity}
                            </button>
                        ))}
                    </div>
                )}

                {loading && <WeatherSkeleton />}


                {weatherData && (() => {
                    const { icon, color } = getWeatherUI(weatherData.weather[0].main);

                    return (
                        <div id="weather-info" style={{ color }}>
                            <div style={{ fontSize: "3rem" }}>{icon}</div>

                            <h2>{weatherData.name}</h2>

                            <p className="temp" style={{ fontSize: "2.2rem", fontWeight: "bold" }}>
                                {weatherData.main.temp} °C
                            </p>

                            <p className="weatherinfo">
                                Wind Speed: {weatherData.wind.speed} m/s
                            </p>

                            <p className="weatherinfo">
                                Weather: {weatherData.weather[0].description}
                            </p>
                        </div>
                    );
                })()}


                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}

                {!loading && !weatherData && !error && (
                    <p>Enter a city to see the weather.</p>
                )}
            </div>
        </div>
    );
}

export default Webpage;