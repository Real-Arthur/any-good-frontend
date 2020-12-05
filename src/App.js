import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import PersonList from './PersonList';
import Jumbotron from 'react-bootstrap/Jumbotron'


function App() {
  const [currentSearch, setSearch] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: currentSearch })
  };
    Promise.all([
    fetch('/person', requestOptions).then(res => res.json().then(data => {
      // console.log('data', data.results[0]);
      if(currentSearch.length > 0) {
        console.log('type', Array.isArray(data.results));
      let fullList = Object.values(data.results);
      setList(fullList)
      console.log('list', list);
      console.log('type', Array.isArray(list));
      } else {
        clear()
      }
    })), 
    ])
  }, [currentSearch]);

  const clear = () => {
    setList([])
    setSearch('')
  }

  console.log('', list);
  return (
    <div className="App">
      <Jumbotron className="jumbotron" style={{color: "white"}}>
        <h1>Are They Any Good?</h1>
        <SearchBar 
        setSearch={setSearch}
        clear={clear}
        /> </Jumbotron>
        <ul>
          {list.map(item => {
            if(item.profile_path !== null) {
              return(
                <PersonList
                id={item.id} 
                thing={item.name}
                personPhoto={item.profile_path}
               />
                )
              }
          } 
          )}
        </ul>
    </div>
  );
}

export default App;
