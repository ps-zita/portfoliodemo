const words = [
    "black", // English
    "أسود", // Arabic
    "黑色", // Chinese
    "ブラック", // Japanese
    "чёрный", // Russian
    "noir", // French
    "schwarz", // German
    "nero", // Italian
    "mαύρος", // Greek
    "검정색"  // Korean
];

const languageTextElement = document.getElementById("languageText");
let currentIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[currentIndex];

    if (isDeleting) {
        languageTextElement.textContent = currentWord.substring(0, currentCharIndex);
        currentCharIndex--;
        if (currentCharIndex < 0) {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % words.length;
        }
    } else {
        languageTextElement.textContent = currentWord.substring(0, currentCharIndex);
        currentCharIndex++;
        if (currentCharIndex > currentWord.length) {
            isDeleting = true;
        }
    }

    setTimeout(type, isDeleting ? 100 : 200);
}

function toggleMenu() {
    const menu = document.getElementById('menu');
    const menuIcon = document.getElementById('menu-icon');
    const body = document.body;
    
    menu.classList.toggle('active');
    menuIcon.classList.toggle('open');
    
    if (menu.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'auto';
    }
}

window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    const topBar = document.querySelector('.top-bar');
    const mainContent = document.querySelector('.main-content');
    const fadeOutPoint = 200; // Adjust based on when you want the text to start fading out

    if (scrollTop < fadeOutPoint) {
        topBar.style.opacity = 1 - scrollTop / fadeOutPoint;
        mainContent.style.opacity = 1 - scrollTop / fadeOutPoint;
    } else {
        topBar.style.opacity = 0;
        mainContent.style.opacity = 0;
    }
});

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        const loadingScreen = document.getElementById("loading-screen");
        if (loadingScreen) {
            loadingScreen.classList.add("hidden");
            setTimeout(() => {
                loadingScreen.style.display = "none";
            }, 1000); // Ensure the element is removed after the transition
        }
    }, 1000); // Start hiding loading screen after 1 second

    type(); // Start the typing effect once the DOM is loaded
});