import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContinentList from '../src/components/ContinentList';
import CountryData from '../src/components/CountryData';
import SearchBar from '../src/components/SearchBar';

const Home = () => {
  const [continents, setContinents] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  const fetchContinents = async () => {
    try {
      const response = await axios.get('https://covid-193.p.rapidapi.com/statistics', {
        headers: {
          'X-RapidAPI-Host': 'covid-193.p.rapidapi.com',
          'X-RapidAPI-Key': '6190390550msh353b555e682e1b3p1ba5a9jsn8b0c0c757ed1',
        },
      });
      const countriesData = response.data.response;
      const continentsData = extractContinents(countriesData);
      setContinents(continentsData);
    } catch (error) {
      console.error('Error fetching continents:', error);
    }
  };

  useEffect(() => {
    fetchContinents();
  }, []);

  const extractContinents = (countriesData) => {
    const continentsMap = new Map();
    countriesData.forEach((country) => {
      const continent = continentsMap.get(country.continent) || {
        continent: country.continent,
        countries: [],
      };
      continent.countries.push(country);
      continentsMap.set(country.continent, continent);
    });
    return Array.from(continentsMap.values());
  };

  const handleContinentClick = (continent) => {
    setSelectedContinent(continent);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      const filteredCountries = continents
        .flatMap((continent) => continent.countries)
        .filter((country) =>
          country.country.toLowerCase().includes(searchQuery.toLowerCase())
        );
      setFilteredCountries(filteredCountries);
    } else {
      setFilteredCountries([]);
    }
  }, [searchQuery, continents]);

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div>
        <h1 className="text-2xl font-bold mb-4">COVID Reports</h1>

        {selectedContinent ? (
          <div>
            <button
              onClick={() => setSelectedContinent(null)}
              className="text-blue-500 mb-4 cursor-pointer bg-inherit"
            >
              Back to Continents
            </button>
            <h2 className="text-xl font-bold mb-2">{selectedContinent.continent}</h2>
            {selectedContinent.countries && selectedContinent.countries.length > 0 ? (
              <CountryData countries={selectedContinent.countries} />
            ) : (
              <p>No countries available for this continent.</p>
            )}
          </div>
        ) : (
          <>
            <input
              type="text"
              placeholder="Search by country"
              value={searchQuery}
              onChange={handleSearch}
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            />
            {filteredCountries.length > 0 ? (
              <div>
                {filteredCountries.map((country) => (
                  <CountryData key={country.country} countries={[country]} />
                ))}
              </div>
            ) : (
              <div>
                {continents.map((continent, i) => (
                  <ContinentList
                    key={i}
                    continent={continent}
                    onClick={handleContinentClick}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
