// Thank you for your donation to [fundraiser_name]
document.getElementById('submit').addEventListener('click', event => {
  event.preventDefault()
  const data = {}
  fetch(`${API_URL}/donation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      alert('Thank you for your donation to [fundraiser_name]')
    })
    .catch(err => {
      alert(err.message)
    })
})
