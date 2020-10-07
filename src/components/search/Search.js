import React, { useState } from 'react';

export default function Search(props) {
  const [search, setSearch] = useState('')

  function handleSubmit(event) {
    event.preventDefault();
    props.onSubmit(search);
  }

  function handleSearch(event) {
    event.preventDefault();
    setSearch(event.target.value);
  }

  return (
    <div className='search'>
      <form onSubmit={handleSubmit}>
        <input className='formStyle' onChange={handleSearch} value={search} type='text' placeholder='city..'></input>
        <input data-testid="search-button" className='formStyle searchbutton' type='submit' value='Search'></input>       
      </form>
    </div>
  )
}
