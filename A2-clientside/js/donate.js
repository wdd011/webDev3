// 获取所有活动
const getSearch = () => {
  const category = document.getElementById('category').value
  const city = document.getElementById('city').value
  const organizer = document.getElementById('organizer').value

  const params = new URLSearchParams({ category, city, organizer })
  fetch(`${API_URL}/search?${params}`)
    .then(response => response.json())
    .then(data => {
      const fundraisersElement = document.getElementById('fundraisersList') // 使用不同的变量名
      fundraisersElement.innerHTML = ``
      if (!data || data.length === 0) {
        fundraisersElement.innerHTML = `<div></div><div class="Nothing">Nothing was found!</div><div></div>`
        return
      }
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
}

document.getElementById('submit').addEventListener('click', getSearch)

// 获取所有类别
fetch(`${API_URL}/categories`)
  .then(response => response.json())
  .then(data => {
    const categoryElement = document.getElementById('category') // 使用不同的变量名
    for (let index = 0; index < data.length; index++) {
      const element = data[index]
      const html = fetchCategoryHtml(element)
      categoryElement.insertAdjacentHTML('beforeend', html)
    }
    getSearch()
  })

// 清除
const clearChechboxes = () => {
  document.getElementById('category').value = -1
  document.getElementById('city').value = ''
  document.getElementById('organizer').value = ''
  getSearch()
}

document.getElementById('clear').addEventListener('click', clearChechboxes)
