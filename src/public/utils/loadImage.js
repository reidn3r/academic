
const loadImage = (e) => {
    const imageContainer = document.querySelector('.loaded-images');
    imageContainer.style.display = "flex";

    for(let i=0; i<e.target.files.length; i++){
        let image = document.createElement('img');
        image.className = 'uploaded-image'
        image.src = URL.createObjectURL(e.target.files[i])
        imageContainer.appendChild(image)
    }
}