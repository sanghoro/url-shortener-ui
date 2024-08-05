export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
}

export const postUrl = (newUrl) => {
  return fetch('http://localhost:3001/api/v1/urls', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUrl),
  })
  .then(res => {
    if(!res.ok){
      throw new Error ('Could not post')
    }
    return res.json()
  })

}