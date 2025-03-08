import React, { useState } from 'react';

const SearchFilter = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="field has-addons has-addons-centered">
      <div className="control">  
        <input
          className="input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <div className="control">
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default SearchFilter;