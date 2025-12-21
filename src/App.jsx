import './App.css'
import Header from './Header'
import Webpage from './Webpage'
import Footer from './Footer'
import ForecastWrapper from './ForecastWrapper'
import { useState } from 'react'

  function App() {
  const [forecastData, setForecastData] = useState([])
  const [forecastLoading, setForecastLoading] = useState(false)

  return (
    <>
      <Header />
      <Webpage
        setForecastData={setForecastData}
        setForecastLoading={setForecastLoading}
      />
      {(forecastLoading || forecastData.length > 0) && (
        <ForecastWrapper
          forecastData={forecastData}
          loading={forecastLoading}
        />
      )}
      <Footer />
    </>
  )
}

export default App
