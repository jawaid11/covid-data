import React from 'react';

const ContinentList = ({ continent, onClick }) => {
  return (

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        <span className="text-lg font-bold">{continent.continent}</span>
        <button
          onClick={() => onClick(continent)}
          className="bg-blue-500 mb-4 cursor-pointer p-2 rounded-full"
        >
          Show data
        </button>
      </div>
  );
};

export default ContinentList;


