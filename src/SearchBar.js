import React, { useState } from 'react';
import { Button } from '@material-ui/core';

function SearchBar(props) {
const [person, isPerson] = useState('')
  const handleSearch = (value) => {
      console.log('person', value);
      isPerson(value)
      props.setSearch(value)
  }
  const clearAll = () => {
      isPerson('')
      props.clear()
  }

  return (
    <>
      <input style={{fontSize: '28px', marginBottom: '0.2em'}} type="text"
      value={person} 
      onChange={event => handleSearch(event.target.value)}
      />
      <Button style={{backgroundColor: '#1F456E', border: 'none', fontSize: '20px', color: 'white'}} onClick={() => {clearAll()}}>Clear</Button>
    </>
  );
}

export default SearchBar;