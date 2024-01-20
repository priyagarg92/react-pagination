import React from 'react';

const Search = ({ searchParam, handleChange }) => {
  return (
    <div className="searchbar">
      <input
        type="text"
        name="search"
        value={searchParam}
        placeholder="Search a post..."
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
