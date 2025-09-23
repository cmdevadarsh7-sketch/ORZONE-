// Search functionality
const searchInput = document.getElementById('searchInput');
const productGrid = document.getElementById('product-grid');
const productCards = productGrid.getElementsByClassName('product-card');

searchInput.addEventListener('keyup', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    Array.from(productCards).forEach(card => {
        const title = card.querySelector('h2').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});


// Popup Card functionality
const popupWrapper = document.getElementById('popup-wrapper');
const popupCard = document.getElementById('popup-card');
const closePopupBtn = document.getElementById('close-popup');

// Show popup after a short delay for animation
window.addEventListener('load', () => {
    setTimeout(() => {
        popupWrapper.style.display = 'flex';
        setTimeout(() => {
            popupCard.classList.add('show');
        }, 10);
    }, 1000);
});

// Function to dismiss the popup
const dismissPopup = () => {
    popupCard.classList.remove('show');
    popupCard.classList.add('hide');
    setTimeout(() => {
        popupWrapper.style.display = 'none';
    }, 500);
};

// Close button functionality
closePopupBtn.addEventListener('click', dismissPopup);

// Swipe functionality
let touchstartX = 0;
let touchendX = 0;
const swipeThreshold = 50; // Minimum distance in pixels for a swipe to be recognized

popupWrapper.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
});

popupWrapper.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    handleSwipeGesture();

});

function handleSwipeGesture() {
    const swipeDistance = touchendX - touchstartX;
    if (Math.abs(swipeDistance) > swipeThreshold) {
        dismissPopup();
    }
}