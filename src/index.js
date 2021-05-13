console.log('%c HI', 'color: firebrick')
const imgUrl = 'https://dog.ceo/api/breeds/image/random/4'
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const colorArray = [
  'black',
  'blue',
  'red',
  'pink',
  'orange',
  'purple',
  'green',
  'yellow'
]

const imageContainer = () => document.getElementById('dog-image-container')
const breedsList = () => document.getElementById('dog-breeds')
const breedDropdown = () => document.getElementById('breed-dropdown')

const fetchAndAppendImages = () => {
  fetch(imgUrl)
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      for (const image of json.message) {
        const imageElement = document.createElement('img')
        imageElement.src = image
        imageContainer().appendChild(imageElement)
      }
    })
}

const fetchAndAppendBreeds = () => {
  fetch(breedUrl)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(json)
      for (const breed of Object.keys(json.message)) {
        const breedElement = document.createElement('li')
        breedElement.innerHTML = `<p>${breed}</p>`
        addColorChangerToBreeds(breedElement)
        breedsList().appendChild(breedElement)
      }
    })
}

const addColorChangerToBreeds = (breed) => {
  breed.addEventListener('click', (event) => {
    const max = Math.floor(colorArray.length)
    const random = Math.random()
    event.target.style.color = colorArray[Math.floor(random * max)]
  })
}

const filterBreeds = () => {
  breedDropdown().addEventListener('change', (event) => {
    const selection = event.target.value.toLowerCase()
    for (const child of breedsList().children) {
      if (child.firstChild.textContent[0] == selection) {
        console.log('found', child.innerHTML)
        child.style.display = 'list-item'
      } else {
        child.style.display = 'none'
      }
    }
  })
}

document.addEventListener('DOMContentLoaded', (event) => {
  fetchAndAppendImages()
  fetchAndAppendBreeds()
  filterBreeds()
})
