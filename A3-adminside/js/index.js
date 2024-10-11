const apiUrl = 'https://24275293.it.scu.edu.au' // 替换为实际 API URL

// DOM Elements
const table = document.getElementById('table')
const createModal = document.getElementById('modal')
const closeCreateButton = createModal.querySelector('.close-button')
const openCreateModalButton = document.getElementById('open-create-modal')
const confirmDeleteButton = document.getElementById('confirm-delete-button')
const cancelDeleteButton = document.getElementById('cancel-delete-button')
let currentFundraiserId = null // Store the ID of the fundraiser being edited or deleted

// Open Create Modal
openCreateModalButton.addEventListener('click', () => {
  openModal('create')
})

// Close Create Modal
closeCreateButton.addEventListener('click', closeModal)

// 获取筹款活动
function getFundraisers() {
  fetch(apiUrl + '/search')
    .then(response => response.json())
    .then(data => {
      table.innerHTML = ''
      data.forEach(fundraiser => {
        const row = document.createElement('tr')
        row.innerHTML = `
                    <td>${fundraiser.FUNDRAISER_ID}</td>
                    <td>${fundraiser.ORGANIZER}</td>
                    <td>${fundraiser.CAPTION}</td>
                    <td>${fundraiser.TARGET_FUNDING}</td>
                    <td>${fundraiser.CURRENT_FUNDING}</td>
                    <td>${fundraiser.CITY}</td>
                    <td>${fundraiser.ACTIVE ? 'Yes' : 'No'}</td>
                    <td>
                        <button class="action-button" onclick="openModal(${fundraiser.FUNDRAISER_ID})">Edit</button>
                        <button class="cancel-button" onclick="openDeleteModal(${fundraiser.FUNDRAISER_ID})">Delete</button>
                    </td>
                `
        table.appendChild(row)
      })
    })
}

// Open Create or Edit Modal
function openModal(type, id = null) {
  const modalTitle = document.getElementById('modal-title')
  const saveButton = document.getElementById('saveButton')
  const form = document.getElementById('form')

  currentFundraiserId = id

  if (type === 'create') {
    modalTitle.textContent = 'Create Fundraiser'
    saveButton.textContent = 'Save'
    form.reset()
    form.onsubmit = createFundraiser
  } else if (type === 'edit') {
    modalTitle.textContent = 'Edit Fundraiser'
    saveButton.textContent = 'Update'
    // fetch(`${apiUrl}/${id}`)
    //   .then(response => response.json())
    //   .then(fundraiser => {
    //     document.getElementById('name').value = fundraiser.name
    //     document.getElementById('description').value = fundraiser.description
    //     document.getElementById('target').value = fundraiser.targetAmount
    //   })
    form.onsubmit = updateFundraiser
  }
  createModal.style.display = 'block'
}

// Create a new fundraiser
async function createFundraiser(event) {
  event.preventDefault()
  const formData = new FormData(event.target)

  const fundraiser = {
    name: formData.get('name'),
    description: formData.get('description'),
    targetAmount: formData.get('target'),
  }

  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fundraiser),
  }).then(() => {
    closeModal()
    getFundraisers()
  })
}

// Update an existing fundraiser
function updateFundraiser(event) {
  event.preventDefault()
  const formData = new FormData(event.target)
  // const fileInput = document.getElementById('fileUpload')
  // const base64File = await handleFileUpload(fileInput)
  // console.log(base64File)
  // const updatedFundraiser = {
  //   name: formData.get('name'),
  //   description: formData.get('description'),
  //   targetAmount: formData.get('target'),
  // }

  // fetch(`${apiUrl}/${currentFundraiserId}`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(updatedFundraiser),
  // }).then(() => {
  //   closeModal()
  //   getFundraisers()
  // })
  // getFundraisers()
}

// Open the delete confirmation modal
function openDeleteModal(id) {
  if (confirm('Are you sure you want to delete this fundraiser?')) {
    console.log('删除了')
  } else {
    console.log('没删除')
  }
}

// Delete a fundraiser
function deleteFundraiser() {
  fetch(`${apiUrl}/${currentFundraiserId}`, { method: 'DELETE' }).then(() => {
    closeModal()
    getFundraisers()
  })
}

// Close any open modal
function closeModal() {
  createModal.style.display = 'none'
}

// Initial load
getFundraisers()
