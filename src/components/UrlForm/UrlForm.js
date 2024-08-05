import React, { useState, useEffect } from 'react';
import { postUrl } from '../../apiCalls';

function UrlForm({addUrls}) {
  const [title, setTitle] = useState('');
  const [urlToShorten, setUrlToShorten] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    clearInputs();

    const newUrl = {
      title: title,
      long_url: urlToShorten
    }

    postUrl(newUrl).then(data =>{
      console.log('posted data', data)
      addUrls(data)
    })
    .catch(err => console.log('posting failed', err))

  }

  const clearInputs = () => {
    setTitle('');
    setUrlToShorten('');
  }

  return (
    <form>
      <input
        type='text'
        placeholder='Title...'
        name='title'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        type='text'
        placeholder='URL to Shorten...'
        name='urlToShorten'
        value={urlToShorten}
        onChange={e => setUrlToShorten(e.target.value) }
      />

      <button onClick={e => handleSubmit(e)}>
        Shorten Please!
      </button>
    </form>
  )
}

export default UrlForm;
