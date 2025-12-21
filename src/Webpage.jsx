import React, { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const MAX_HISTORY = 4;

function Webpage({ setForecastData, setForecastLoading  }) {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [history, setHistory] = useState(() => {
        try {
            const storedHistory = localStorage.getItem('weatherCityHistory');
            return storedHistory ? JSON.parse(storedHistory) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('weatherCityHistory', JSON.stringify(history));
    }, [history]);

    useEffect(() => {
        fetchWeatherByLocation();
    }, []);

    const updateHistory = (newCity) => {
        const normalizedCity =
            newCity.trim().charAt(0).toUpperCase() +
            newCity.trim().slice(1).toLowerCase();

        const filtered = history.filter(
            c => c.toUpperCase() !== normalizedCity.toUpperCase()
        );

        setHistory([normalizedCity, ...filtered].slice(0, MAX_HISTORY));
    };

const fetchForecastData = async (lat, lon) => {
    try {
        setForecastLoading(true)

        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        const res = await fetch(url)
        if (!res.ok) throw new Error()

        const data = await res.json()

        const dailyMap = {}
        data.list.forEach(item => {
            if (item.dt_txt.includes("12:00:00")) {
                const date = item.dt_txt.split(" ")[0]
                dailyMap[date] = item
            }
        })

        const daily = Object.values(dailyMap).slice(0, 5)
        setForecastData(daily)
    } catch {
        setForecastData([])
    } finally {
        setLoading(false);
        setForecastLoading(false)
    }
}

    const fetchWeatherData = async (cityName) => {
        const name = cityName.trim();
        if (!name) return;

        setLoading(true);
        setError(null);
        setWeatherData(null);

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}&units=metric`;
            const res = await fetch(url);
            if (!res.ok) throw new Error("City not found");

            const data = await res.json();
            setWeatherData(data);
            updateHistory(data.name);
            fetchForecastData(data.coord.lat, data.coord.lon);
        } catch (err) {
            setError(err.message);
            setLoading(false);
            setForecastLoading(false);
        }
    };

    const fetchWeatherByLocation = () => {
        if (!navigator.geolocation) {
            setError("Geolocation not supported");
            return;
        }

        setLoading(true);
        setError(null);
        setWeatherData(null);

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                try {
                    const { latitude, longitude } = pos.coords;
                    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
                    const res = await fetch(url);
                    if (!res.ok) throw new Error();

                    const data = await res.json();
                    setWeatherData(data);
                    setCity(data.name);
                    updateHistory(data.name);
                    fetchForecastData(data.coord.lat, data.coord.lon);
                } catch {
                    setError("Location fetch failed");
                } finally {
                    setLoading(false);
                }
            },
            () => {
                setError("Location permission denied");
                setLoading(false);
            }
        );
    };

    const getWeatherUI = (main) => {
        switch (main) {
            case "Clear": return { icon: "☀️", color: "#facc15" };
            case "Clouds": return { icon: "☁️", color: "#60a5fa" };
            case "Rain": return { icon: "🌧️", color: "#38bdf8" };
            case "Snow": return { icon: "❄️", color: "#bae6fd" };
            case "Thunderstorm": return { icon: "⛈️", color: "#818cf8" };
            default: return { icon: "🌤️", color: "#94a3b8" };
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
                        onKeyDown={(e) => e.key === "Enter" && fetchWeatherData(city)}
                        disabled={loading}
                    />
                </div>

                {history.length > 0 && (
                    <div className="history-container">
                        <p>Recent Searches:</p>
                        {history.map((h, i) => (
                            <button
                                key={i}
                                className="history-button"
                                onClick={() => fetchWeatherData(h)}
                            >
                                {h}
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
                            <p className="temp">{weatherData.main.temp} °C</p>
                            <p className="weatherinfo">
                                Wind Speed: {weatherData.wind.speed} m/s
                            </p>
                            <p className="weatherinfo">
                                {weatherData.weather[0].description}
                            </p>
                        </div>
                    );
                })()}

                {error && <p className="error">{error}</p>}

                {!loading && !weatherData && !error && (
                    <p className="citytext">Enter a city to see the weather.</p>
                )}
            </div>
        </div>
    );
}

export default Webpage;
