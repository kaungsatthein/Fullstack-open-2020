import React from "react";

export default function Countries({ filteredCountries, setSelectedCountry }) {
  return (
    <div>
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.cca3}>
              {country.name.common} <button onClick={() => setSelectedCountry(country)}>show</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
