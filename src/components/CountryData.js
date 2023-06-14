import React from 'react';

const CountryData = ({ countries }) => {
  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="border px-4 py-2">Country</th>
          <th className="border px-4 py-2">Population</th>
          <th className="border px-4 py-2">Total COVID Cases</th>
        </tr>
      </thead>
      <tbody>
        {countries.map((country, i) => (
          <tr key={i}>
            <td className="border px-4 py-2">{country.country}</td>
            <td className="border px-4 py-2">{country.population}</td>
            <td className="border px-4 py-2">{country.cases.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CountryData;
