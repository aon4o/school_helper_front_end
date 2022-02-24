document.addEventListener("DOMContentLoaded", function(){
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        const navbarContainer = document.getElementById('navbar-container');
        if (window.scrollY > 200) {
            navbar.classList.add('fixed-top', 'bg-primary');
            navbarContainer.classList.remove('mt-3', 'px-3', 'py-2');
        } else {
            navbar.classList.remove('fixed-top', 'bg-primary');
            navbarContainer.classList.add('mt-3', 'px-3', 'py-2');
        }
    });
});