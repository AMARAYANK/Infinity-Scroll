const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = []

// Unsplash API
const apiKey= 'Uu5nrf2M2FxEaKcL1RyuogRkL3hRAmCrgSvq2q0l91Q'
const count = 10
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

// Check if all images were loaded 

function imageLoaded() {
  imagesLoaded++
  if(imagesLoaded === totalImages){
      ready = true
      loader.hidden = true
  }
}


// Create elements for links and photos, Add to DOM

function displayPhotos() {
   totalImages = photosArray.length
   imagesLoaded = 0   
    // Run function for each element in photos array
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })
        // Create <img> for photo
        const img = document.createElement('img')
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
            
        // Event Listener, Check when each is finished loading
        img.addEventListener('load',imageLoaded)

        // Put <img> inside the <a>, then put both inside imageContainer element
        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}


//  Get photos from Unsplash API 

async function getPhotos() {
    try { 
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        displayPhotos() 
    } catch (e) {
        console.log(e)
    }
}

// Check to see if scrolling near bottom of page, Load More Photos

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos()
    }
})

// On Load
getPhotos()