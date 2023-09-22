const updateImage = (event) => {
    const id = event.target.className.split('-')[2];
    const image = document.querySelector(`.image-${id}`);
    image.src = URL.createObjectURL(event.target.files[0]);
}