import React, { useState } from 'react'

const SearchForm = () => {
  const [ searchQuery, setSearchQuery ] = useState('');
  return (
    <div className="flex justify-center mt-6">
      <h3 className="text-3xl font-bold">FORM HERE</h3>
    </div>
  );
};

export default SearchForm;