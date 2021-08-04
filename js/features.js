/* Small features that are used in all the web pages
darkModeToggle is to toggle dark mode for the current web page
topFunction is to help users scroll to the top easily */
function darkModeToggle() {
    const element = document.querySelector('.container');
    element.classList.toggle("dark_mode");
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}