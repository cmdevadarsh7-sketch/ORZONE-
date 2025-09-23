// Store product data for search functionality
const products = [
    { title: 'Product Title 1', description: 'A short, compelling description of the product goes here.', code: 'ORZ101' },
    { title: 'Product Title 2', description: 'A short, compelling description of the product goes here.', code: 'ORZ102' },
    { title: 'Product Title 3', description: 'A short, compelling description of the product goes here.', code: 'ORZ103' },
    { title: 'Product Title 4', description: 'A short, compelling description of the product goes here.', code: 'ORZ104' },
    { title: 'Product Title 5', description: 'A short, compelling description of the product goes here.', code: 'ORZ105' }
];

// Search functionality
const searchInput = document.getElementById('searchInput');
const searchResultsContainer = document.getElementById('searchResults');
const productGrid = document.getElementById('product-grid');
const productCards = productGrid.getElementsByClassName('product-card');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    searchResultsContainer.innerHTML = '';

    if (searchTerm.length > 0) {
        const filteredProducts = products.filter(product =>
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );

        if (filteredProducts.length > 0) {
            filteredProducts.forEach(product => {
                const suggestionDiv = document.createElement('div');
                suggestionDiv.classList.add('search-suggestion');
                suggestionDiv.textContent = product.title;
                suggestionDiv.addEventListener('click', () => {
                    searchInput.value = product.title;
                    filterProducts(product.title);
                    searchResultsContainer.classList.add('hidden');
                });
                searchResultsContainer.appendChild(suggestionDiv);
            });
            searchResultsContainer.classList.remove('hidden');
        } else {
            searchResultsContainer.classList.add('hidden');
        }
    } else {
        searchResultsContainer.classList.add('hidden');
        filterProducts('');
    }
});

searchInput.addEventListener('keyup', (e) => {
    filterProducts(e.target.value);
});

const filterProducts = (searchTerm) => {
    Array.from(productCards).forEach(card => {
        const title = card.querySelector('h2').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();

        if (title.includes(searchTerm.toLowerCase()) || description.includes(searchTerm.toLowerCase())) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
};


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

popupCard.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
});

popupCard.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    handleSwipeGesture();
});

function handleSwipeGesture() {
    if (touchendX < touchstartX) {
        // Swipe left
        dismissPopup();
    }
    if (touchendX > touchstartX) {
        // Swipe right
        dismissPopup();
    }
}