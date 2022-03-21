import React, { useState } from 'react'


function App() {
  
  // API BASE

  const api = {
    base: "https://api.openweathermap.org/data/2.5/",
    key: "3ff551abf33ed7ae33e65cdbfd5f73ae"
  }
      
  // CURRENT TIME

  let currentTime = d => {

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    

    let month = months[d.getMonth()];
    let day = days[d.getDay()];
    let todaysDate = d.getDate(); 
    let year = d.getFullYear();

    return `${todaysDate} ${day} ${month} ${year}`
  };
    
  // MAIN LOGIC BEHIND THE APP

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = event => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(response => response.json())
        .then(data => {
          setQuery('');
          setWeather(data);       
      })
    }
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? ('app warm') : ('app')) : ('app')}>
      <main>
        <div className="search-box">
          <input 
            type='text'
            placeholder='Search...'
            className='search'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != 'undefined') ? (
          <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className='time'>{currentTime(new Date())}</div>
            <div className="temperature">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="description">{weather.weather[0].main}</div>
          </div>
          </div>
        ) : ('')}
      </main>
    </div>
  )
}

export default App;