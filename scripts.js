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

window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    const mainContent = document.querySelector('.main-content');
    const fadeOutPoint = window.innerHeight / 6; // Start and end fade sooner
    const tiles = document.querySelectorAll('.tile');

    const opacity = 1 - (scrollTop / fadeOutPoint);
    mainContent.style.opacity = opacity >= 0 ? opacity : 0;

    tiles.forEach(tile => {
        if (scrollTop > window.innerHeight / 4) { // Adjusted to scroll in sooner
            tile.style.transform = 'translateY(0)';
        } else {
            tile.style.transform = 'translateY(100vh)';
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    type(); // Start the typing effect once the DOM is loaded

    const tiles = document.querySelectorAll('.tile');
    const content = document.getElementById('content');
    const iframeContainer = document.getElementById('iframeContainer');
    const mainContent = document.getElementById('mainContent');

    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const url = tile.getAttribute('data-url');
            mainContent.style.opacity = 0;
            content.style.opacity = 0;
            setTimeout(() => {
                mainContent.style.display = 'none';
                content.style.display = 'none';
                iframeContainer.style.display = 'block';
                iframeContainer.querySelector('iframe').src = url;
            }, 500); // Match the duration of the fade-out transition
        });
    });

    document.addEventListener('click', (event) => {
        if (iframeContainer.style.display === 'block' && !iframeContainer.contains(event.target)) {
            location.reload(); // Refresh the page when clicking outside the iframe
        }
    });
});