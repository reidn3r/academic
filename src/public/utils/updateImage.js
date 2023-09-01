
const updateImage = (event) => {
    const image = document.querySelector('.profile-image');
    image.src = URL.createObjectURL(event.target.files[0]);
}