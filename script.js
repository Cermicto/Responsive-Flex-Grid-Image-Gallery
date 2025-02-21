d = document
d.ce = d.createElement
d.gebi = d.getElementById
d.gebt = d.getElementsByTagName
d.gebc = d.getElementsByClassName
d.qsa = d.querySelectorAll
b = d.body

imagePreviews = d.gebc('img-preview')
insertedStyles = d.gebi('insertedStyles')
displayUnderlay = d.gebi('displayUnderlay')

currentImage = 0
currentColumn = 0
maxImages = imagePreviews.length

for (var i = 0; i < imagePreviews.length; i++) {
	imagePreviews[i].id = `imgPreview${currentImage}`
	imagePreviews[i].setAttribute('tabindex', `${currentImage}`)

	currentImage = currentImage + 4

	if (currentImage >= maxImages) {
		currentColumn++
		currentImage = currentColumn
	}
}





imageIsDisplayed = false
displayedImageId = null
displayedImageNumber = null
previousImageId = null
previousImageNumber = null
nextImageId = null
nextImageNumber = null


for (var i = 0; i < imagePreviews.length; i++) {
	imagePreviews[i].onclick = function () {
		imageIsDisplayed = true
		displayedImageId = this.id
		displayedImageNumber = parseInt(displayedImageId.replace('imgPreview', ''))

		if ((displayedImageNumber -1) == -1) {
			previousImageNumber = imagePreviews.length - 1
		} else {
			previousImageNumber = displayedImageNumber - 1
		}

		if ((displayedImageNumber + 1) == imagePreviews.length) {
			nextImageNumber = 0
		} else {
			nextImageNumber = displayedImageNumber + 1
		}

		displayUnderlay = d.gebi('displayUnderlay')
		displayUnderlay.classList.remove('hidden')

		imageIsAdded = initImage(this.src, this.getAttribute('imgtitle'))

		currentDisplayedImageContainer = d.gebi('currentDisplayedImageContainer')
		currentDisplayedImage = d.gebi('currentDisplayedImage')

		if (getMinSize() == 'vh') {
			currentDisplayedImageContainer.style.height = currentDisplayedImage.height + 'px'
		} else {
			currentDisplayedImageContainer.style.width = currentDisplayedImage.width + 'px'
		}

		currentDisplayedImageContainer.classList.add('scale-in')
	}
}

function getMinSize () {
	if (window.innerHeight < window.innerWidth) {
		return 'vh'
	} else {
		return 'vw'
	}
}

function initImage(imgSrc, imgTitle) {
	imgContainer = d.ce('div')
	imgContainer.id= 'currentDisplayedImageContainer'
	imgContainer.classList.add('display-image-container')

	imgObj = d.ce('img')
	imgObj.id = 'currentDisplayedImage'
	imgObj.classList.add('display-image')
	imgObj.src = imgSrc

	imgContainer.appendChild(imgObj)

	imgTitleContainer = d.ce('div')
	imgTitleContainer.classList.add('displayed-image-title-container')
	imgTitleContainer.innerHTML = `<span class="displayed-image-title">${imgTitle}</span>`

	imgContainer.appendChild(imgTitleContainer)

	b.appendChild(imgContainer)

	return true
}

displayUnderlay.onclick = function () {
	displayedImageContainer = d.gebi('currentDisplayedImageContainer')
	displayedImageContainer.classList.add('scale-out')

	window.setTimeout(function() {
		displayedImageContainer.remove()
		displayUnderlay.classList.add('hidden')
	}, 500)
}

