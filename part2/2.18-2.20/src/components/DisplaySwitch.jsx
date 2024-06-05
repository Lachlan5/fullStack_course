import CountryDetails from "./CountryDetails"

const DisplaySwitch = ({countries, countriesToShow, handleShowButton, handleSetWeather, weatherData}) => {

    if (countries.length == 0) return <div>loading countries</div>
    if (countriesToShow.length == 1) return <CountryDetails country={countriesToShow[0]} handleSetWeather={handleSetWeather} weatherData={weatherData}/>
    if (countriesToShow.length <= 10) {
      return (
        countriesToShow.map(country =>
          <div key={country.name.official}>
            {country.name.common} <button onClick={() => handleShowButton(country.name.common)}>show</button>
          </div>
        )
      )
    }
    return <div>Too many matches, specify another filter</div>
  }

  export default DisplaySwitch