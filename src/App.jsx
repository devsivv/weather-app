import './App.css'
import Header from './Header'
import Webpage from './Webpage'
import Footer from './Footer'
import ForecastWrapper from './ForecastWrapper'
import { useState } from 'react'

function App() {
  const [forecastData, setForecastData] = useState([])

  return (
    <>
      <Header />
      <Webpage setForecastData={setForecastData} />
      {forecastData.length > 0 && (
        <ForecastWrapper forecastData={forecastData} />
      )}
      <Footer />
    </>
  )
}

export default App
