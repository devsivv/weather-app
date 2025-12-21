function SkeletonForecast() {
  return (
    <div className="forecast-container">
      <div className="forecast-main-title">
        <h3>Weather Forecasted</h3>
      </div>

      <div className="forecast-cards">
        {[...Array(5)].map((_, idx) => (
          <div key={idx} className="forecast-card skeleton-forecast-card">
            <div className="skeleton skeleton-day"></div>
            <div className="skeleton skeleton-icon"></div>
            <div className="skeleton skeleton-temp"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ForecastWrapper({ forecastData, loading }) {

  const getDay = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' });

  if (loading) return <SkeletonForecast />;

  if (!forecastData || forecastData.length === 0) return null;

  return (
    <div className="forecast-container">
      <div className="forecast-main-title">
        <h3>Weather Forecasted</h3>
      </div>

      <div className="forecast-cards">
        {forecastData.map((item, idx) => (
          <div key={idx} className="forecast-card">
            <p className="forecast-day">{getDay(item.dt_txt)}</p>

            <div className="forecast-icon">
              {item.weather[0].main === "Clear" && "☀️"}
              {item.weather[0].main === "Clouds" && "☁️"}
              {item.weather[0].main === "Rain" && "🌧️"}
              {item.weather[0].main === "Snow" && "❄️"}
            </div>

            <p className="forecast-temp">
              {item.main.temp.toFixed(1)}°C
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastWrapper;
