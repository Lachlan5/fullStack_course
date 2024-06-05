import { useState, useEffect } from 'react'
import axios from 'axios'
import DisplaySwitch from './components/DisplaySwitch';

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [weatherData, setWeatherData] = useState({})
  const api_key = import.meta.env.VITE_SOME_KEY

  useEffect(() => {
    const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    request.then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  let countriesToShow = []
  filter == '' 
  ? countriesToShow = countries
  : countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  const handleShowButton = (countryName) => {
    setFilter(countryName)
  }

  const handleSetWeather = (lat, lng) => {
    const request = axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${api_key}`)
    request.then(response => {
      const newWeatherData = {}
      newWeatherData.temp = response.data.current.temp
      const iconCode =  response.data.current.weather[0].icon
      const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
      newWeatherData.icon = iconURL
      newWeatherData.wind = response.data.current.wind_speed
      setWeatherData(newWeatherData)
    })
  }
  

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilterChange}></input>
      </div>
      <DisplaySwitch 
      countries={countries} 
      countriesToShow={countriesToShow} 
      handleShowButton={handleShowButton} 
      handleSetWeather={handleSetWeather}
      weatherData={weatherData}
      />
    </div>
  )
}

export default App