import React, { useState, useEffect } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';


function App () {
  const [urls, setUrls] = useState([]);

  const addUrls = (postedUrl) => {
    setUrls(prev => [...prev, postedUrl ])
  }

  useEffect(() => {
    getUrls().then(data => {
      console.log('fetche data', data)
      setUrls(data.urls)
    })
    .catch(err => console.log(err))

  }, [])



  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm addUrls={addUrls}/>
      </header>

      <UrlContainer urls={urls}/>
    </main>
  );
}

export default App;
