fetch(`${API_URL}/fundraisers`)
  .then(response => response.json())
  .then(data => {
    const fundraisersElement = document.getElementById('fundraisers') // 使用不同的变量名
    for (let index = 0; index < data.length; index++) {
      const element = data[index]
      const html = fetchHtml(element)
      fundraisersElement.insertAdjacentHTML('beforeend', html)
    }
    const doms = document.querySelectorAll('.fundraiser-card')
    doms.forEach((item, index) => {
      item.addEventListener('click', () => navTo('./details.html?id=' + data[index].FUNDRAISER_ID))
    })
  })
