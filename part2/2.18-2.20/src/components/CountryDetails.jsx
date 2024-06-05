const CountryDetails = ({country, handleSetWeather, weatherData}) => {

    let languages = [];
    for (let language of Object.values(country.languages)) {
      languages.push(language)
    }
  
    const [lat,lng] = country.latlng
    handleSetWeather(lat,lng)
  
    return (
      <div>
          <h1>{country.name.common}</h1>
          <div>Capital: {country.capital[0]}</div>
          <div>Area: {country.area}</div>
          <h2>Languages:</h2>
          <ul>
            {languages.map(language => <li key={language}>{language}</li>)}
          </ul>
          <img src={country.flags.png}/>
          <h1>Weather in {country.name.common}</h1>
          <div>temperature: {weatherData.temp} Celcius</div>
          <img src={weatherData.icon}/>
          <div>wind: {weatherData.wind} m/s</div>
        </div> 
    )
  }

  export default CountryDetails