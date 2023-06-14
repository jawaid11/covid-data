import React from 'react'

const SearchBar = ({countries}) => {
  return (
    <div className='w-full'>
      <h2 className="text-xl font-bold mb-2">Search Results</h2>
      <ul className="list-disc pl-6">
        {countries.map((country, i) => (
          <li key={i}>{country.country}</li>
        ))}
      </ul>
    </div>
  );
};

 
export default SearchBar;
