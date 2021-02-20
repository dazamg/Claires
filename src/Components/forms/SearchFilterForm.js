import React from 'react'


const SearchFilterForm = ({searchquery, setSearchquery}) => {
    const handleSearchChange = (e) => {
        e.preventDefault()
        setSearchquery(e.target.value.toLowerCase());
      };

    return (
      <input type="search" placeholder="Filter" 
      value={searchquery} 
      onChange={handleSearchChange}
      className="form-control mb-4"
      />  
  )
}

export default SearchFilterForm
