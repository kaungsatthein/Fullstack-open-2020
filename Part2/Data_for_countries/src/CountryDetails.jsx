import React from "react";

export default function CountryDetails({ selectedCountry, weatherData }) {
  return (
    <>
      {selectedCountry && (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Area: {selectedCountry.area}</p>
          <p>Languages: {Object.values(selectedCountry.languages).join(", ")}</p>
          <img
            src={selectedCountry.flags.svg}
            alt={`${selectedCountry.name.common} flag`}
            width="100"
          />
          {/* <h2>Weather in {selectedCountry.name.common}</h2>
          {weatherData && weatherData.current && ( // Check if weatherData and weatherData.current are not null
            <>
              <p>Temperature: {weatherData.current.temperature} °C</p> // Use correct property for temperature
              <p>Wind: {weatherData.current.wind_speed} m/s</p> // Use correct property for wind speed
            </>
          )}
          {!weatherData && <p>Weather data not available</p>} // Handle case where weather data is not available */}
        </div>
      )}
    </>
  );
}
