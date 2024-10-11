const API_URL = `http://localhost:3002`

const links = document.querySelectorAll('#nav a')
const currentPath = window.location.pathname
links.forEach(link => {
  if (link.getAttribute('href').split('/').pop() === currentPath.split('/').pop()) {
    link.classList.add('active')
  }
})

const navTo = url => {
  window.location.href = url
}

function fetchHtml(data) {
  const images = ['./img/dog.jpg', './img/yuhan.jpg', './img/yang.jpg', './img/shui.jpg', './img/dog2.jpg']
  return `
	  <div class="fundraiser-card" id="fundraiser-card">
      <img src="${images[data.FUNDRAISER_ID - 1]}" alt="" />
      <div class="title">${data.CAPTION}</div>
      <div class="details">
          <div class="group">
            <div>City:</div>
            <div>${data.CITY}</div>
          </div>
          <div class="group">
            <div>Organizer:</div>
            <div>${data.ORGANIZER}</div>
          </div>
          <div class="group">
            <div>Category:</div>
            <div>${data.CATEGORY_NAME}</div>
          </div>
          <div class="group">
            <div>Current funds:</div>
            <div>${data.CURRENT_FUNDING}</div>
          </div>
          <div class="group">
            <div>Target financing:</div>
            <div>${data.TARGET_FUNDING}</div>
          </div>
          <div class="group">
            <div>Active:</div>
            <a class="${data.ACTIVE === 0 ? 'hRed' : ''}">${data.ACTIVE === 0 ? 'Inactive' : 'Active'}</a>
          </div>
      </div>
	  </div>
	`
}

function fetchCategoryHtml(data) {
  return `<option value="${data.CATEGORY_ID}">${data.NAME}</option>`
}

function fetchParticularsHtml(data) {
  const images = ['./img/dog.jpg', './img/yuhan.jpg', './img/yang.jpg', './img/shui.jpg', './img/dog2.jpg']
  const test = [
    `<h3>About Lavi & Her Family</h3>
<p>Ash and Bryce adopted the gorgeous Lavi from Greyhound Rescue in 2019. She is an integral part of their family and very much-loved. She adores their son, Charlie and shares the home with Sox the greyhound, also a former Greyhound Rescue kennel kid.

The family are expecting their second baby in December and have spent all their emergency funds/maternity leave money to pay the vet bills for Lavi to date.</p>
<h3>What Happened</h3>
<h3>Beautiful Lavender, now 9, had been slowing down over the last few weeks. The family took her to the vet to get checked. They were told she had mildly elevated liver levels and recommended a supplement.</h3>  

<h3>The following day, Lavi was in excruiting pain, so they visited the vet again and she was admitted. Her heart rate was up and she was in a lot of pain and was started on strong pain relief. Her local vets then recommended she undergo an abdominal ultrasound so she was admitted to VSOS, through their emergency department on Friday 13 September. </h3>

<h3>The ultrasound results came back clear. VSOS believed Lavi may have some neurological issues as her back legs were not working. An MRI was done and that also came back clear. They just don't know what is wrong with her.  The family absolutely adore Lavi and don't want her in pain and don't want to lose her. </h3>
`,
    `
   <p> We are launching a life-saving winter blanket campaign to provide warmth to the most vulnerable families in Gaza this winter. This initiative is a joint effort between five trusted aid groups: The Zaynab Project, The Sameer Project, Angie Q8, Road to Freedom, and Save Gaza’s Children. Together, we aim to provide thick, wool, 3-layer blankets to families who desperately need protection from the harsh winter conditions.</p>

<p>Why This is Urgent:</p>
<p>Last winter, heavy wool blankets cost around $80 each. This year, by acting quickly and securing a better deal early on, we have been able to reduce the cost significantly. Each blanket will now cost 50 shekels (approximately $13). These blankets are 2 meters long, 1.5 meters wide, and made of 3 layers of heavy wool—perfect for providing critical warmth to families living in tents and makeshift shelters.</p>

<p>Thousands of families, especially those living in coastal areas, are facing severe cold winds, rain, and harsh weather conditions. With homes destroyed and no access to regular aid, many now live in tents or shelters made from sheets and blankets, leaving them extremely vulnerable. Thick, durable blankets are not just needed—they are life-saving.</p>
`,
    `
<p>Dear Friends and Supporters,</p>

<p>Lucky Stars Sanctuary has been a safe haven for countless animals, providing love, care, and rehabilitation thanks to the incredible vision of our beloved founder, Kerrie Carroll. Today, we face a significant challenge that requires your urgent help and support.</p>

<p>Our Current Situation</p>

<p>Due to ongoing legal and logistical issues, we must relocate Lucky Stars Sanctuary. We’ve been working tirelessly with banks and lawyers to resolve the issues surrounding Kerrie’s properties, but we’ve encountered significant roadblocks that prevent us from continuing our operations at our current location. </p>

<p>Why We Need Your Help</p>

<p>To keep Kerrie’s legacy alive and continue providing sanctuary to animals in need, we must move to a new location. This relocation is more than simply moving; it’s about ensuring the wellbeing and safety of our animals and setting up a sustainable future for Lucky Stars Sanctuary. </p>

<p>Our Vision for the Future</p>

<p>Despite the challenges, we are determined to create a brighter future for Lucky Stars Sanctuary. Our vision includes:</p>

<p>Sanctuary Accommodation: Creating safe and comfortable spaces for animals and visitors.
Sanctuary Tours: Offering guided tours to educate and inspire visitors.
Animal-Assisted Learning & Therapy: Providing therapeutic interactions with animals.
Plant-Based Agriculture: Promoting sustainable and ethical farming practices. (Determined by the available land) </p>
<p>Expanding number of different species in care (Cows, Camels, Brumbies and Wombat Rescue)
To make this vision a reality, we need a new property that meets specific requirements, including over 15 hectares of land, proximity to a major population center, and accessibility to veterinary and agricultural services.</p>
`,
    `<p>UPDATE Waddananggu Magarran (3 year anniversary) on Country </p>

<p>We are still waiting.</p>

<p>It’s been 3 months since our Supreme Court hearing.</p> 

<p>We are still waiting. </p>

<p>It’s been 10 years since we said NO to Adani’s mine.</p>

<p>We are still waiting. </p>

<p>Soon, it will mark 3 years since we lit the fire at Waddananggu to say loud and clear - we protect our Country as our ancestors have since time immemorial. </p>

<p>We are still here waiting. When will they finally listen to us?</p>

<p>We are so incredibly grateful for your support. It gives us hope that the Government will finally listen to us and end more than a decade of abuse, exploitation and denial of our rights. Please continue to follow and share our campaign with anyone who will listen and help us to make this right.</p>`,
    `<p>My name is Sonya Takau. I’m a Jirrbal Rainforest Aboriginal woman. I need your help to protect the Dingo (ganibarra) - a native animal, my kin, that has been targeted by the livestock industry. </p>

<p>Across the country, Australia's iconic Dingo is being killed through poison baiting campaigns, trapping, shooting and traps laced with poison. </p>

<p>Dingoes have indisputably been here for thousands of years. They are a native animal, yet they are treated as a pest. </p>

<p>Why? Because the livestock industry wants them culled to protect their profits. They use the term ‘wild dog’ to justify the killing of a native species that is our kin (family).</p> 

<p>We urgently need your help to save the Dingo, before it’s too late. </p>

<p>As First Nations People, we have a cultural obligation mandated by our Ancestors to RESPECT, PROTECT and CARE for our animals and plants. </p>

<p>Early historical recordings of the cultural significance of the Dingo to Aboriginal people in Australia has predominantly been recorded by non-indigenous people.  These historical accounts are important and provide insight into the topic, however, most written sources of history offer a view of the past from the point of view of those who held power.</p>`,
  ]
  return `
	<div class="container">
		    <img src="${images[data.FUNDRAISER_ID - 1]}" />
        <h1 id="title">${data.CAPTION}</h1>
        <div class="details">
            <p><strong>ORGANIZER:</strong> <span id="organizer">${data.ORGANIZER}</span></p>
            <p><strong>TARGET FUNDING:</strong> <span id="targetFunding">${data.TARGET_FUNDING}</span></p>
            <p><strong>CURRENT FUNDING:</strong> <span id="currentFunding">${data.CURRENT_FUNDING}</span></p>
            <p><strong>CITY:</strong> <span id="city">${data.CITY}</span></p>
            <p><strong>CATEGORY:</strong> <span id="eventStatus">${data.CATEGORY_NAME}</span></p>
			      <p><strong>ACTIVE:</strong> <span id="category" class="${data.ACTIVE === 0 ? 'hRed' : ''}">${data.ACTIVE === 0 ? 'Inactive' : 'Active'}</span></p>
        </div>
  			<a href="#" class="button" onclick="alert('This feature is under contruction')">Donate</a>
        <div class="description">
          ${test[data.FUNDRAISER_ID - 1]}
        </div>
        <div class="donateButton"></div>
  </div>
	`
}

const queryString = window.location.search
const params = new URLSearchParams(queryString)
if (params.get('id')) {
  fetch(`${API_URL}/fundraiser/` + params.get('id'))
    .then(response => response.json())
    .then(data => {
      const categoryElement = document.getElementById('details')
      const html = fetchParticularsHtml(data)
      categoryElement.insertAdjacentHTML('beforeend', html)
    })
}
