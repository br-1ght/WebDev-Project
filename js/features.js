function darkModeToggle() {
    const element = document.querySelector('.container');
    element.classList.toggle("dark_mode");
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}