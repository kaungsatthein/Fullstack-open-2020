import axios from "axios";
import React, { useEffect, useState } from "react";
import Countries from "./countries";
import CountryDetails from "./CountryDetails";

// const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export default function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  // const [weatherData, setWeatherData] = useState(null); // Set initial value to null

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries data", error);
      });
  }, []);

  // useEffect(() => {
  //   const baseUrl = "https://api.weatherstack.com/current"; // Use HTTPS
  //   if (API_KEY && countries.length === 1) {
  //     const capital = countries.map((country) => country.capital);
  //     if (capital[0]) {
  //       axios
  //         .get(`${baseUrl}?access_key=${API_KEY}&query=${capital[0]}`)
  //         .then((response) => {
  //           setWeatherData(response.data);
  //         })
  //         .catch((error) => {
  //           console.error("Error fetching weather data", error);
  //           setWeatherData(null); // Handle error by setting weatherData to null
  //         });
  //     }
  //   }
  // }, [countries, API_KEY]);

  const filteredCountries = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <label>Find countries</label>
      <input type="text" onChange={(e) => setSearch(e.target.value)} />
      {!selectedCountry && (
        <Countries
          countries={countries}
          filteredCountries={filteredCountries}
          setSelectedCountry={setSelectedCountry}
        />
      )}
      <CountryDetails
        selectedCountry={selectedCountry}
        // weatherData={weatherData}
      />
    </div>
  );
}
