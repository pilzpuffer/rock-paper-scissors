const loaderContainer = document.querySelector('.loader-container');

window.addEventListener('load', () => {
    setTimeout(() => {
        loaderContainer.classList.toggle("invisible");
    }, 1000);
});