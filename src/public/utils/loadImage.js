let lastImages = [];

const loadImage = (e) => {
    const maxFiles = 3;
    const imageContainer = document.querySelector('.loaded-images');
    imageContainer.style.display = "flex";

    imageContainer.innerHTML = '';
    lastImages = [];

    for(let i = 0; i < maxFiles; i++){
        if (e.target.files[i]) {
            let image = document.createElement('img');
            image.className = 'uploaded-image';
            image.src = URL.createObjectURL(e.target.files[i]);
            imageContainer.appendChild(image);
            
            // Armazena as últimas imagens selecionadas na variável global
            lastImages.push(e.target.files[i]);
        }
    }
}
