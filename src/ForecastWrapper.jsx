function ForecastWrapper({ forecastData }) {
  const getDay = (dateStr, idx) => {
    const day = new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long' });
    return day.slice(0, 3);
  };

  return (
    <div className="forecast-container">
      <div className="forecast-main-title">
         <h3 >Weather Forecasted</h3>
      <div className="forecast-cards">
        {forecastData.map((item, idx) => (
          <div key={idx} className="forecast-card">
            <p className="forecast-day">{getDay(item.dt_txt, idx)}</p>
            <div className="forecast-icon">
              {item.weather[0].main === "Clear" && "☀️"}
              {item.weather[0].main === "Clouds" && "☁️"}
              {item.weather[0].main === "Rain" && "🌧️"}
              {item.weather[0].main === "Snow" && "❄️"}
            </div>
            <p className="forecast-temp">{item.main.temp.toFixed(1)} °C</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default ForecastWrapper;