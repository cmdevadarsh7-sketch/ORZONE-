// Check for local storage support
if (typeof(Storage) !== "undefined") {
    const inquiryButtons = document.querySelectorAll('.inquiry-btn');
    const inquiryCountSpan = document.getElementById('inquiry-count');
    const inquiryListContainer = document.getElementById('inquiry-list-container');
    const viewInquiryListButton = document.getElementById('view-inquiry-list');
    const WHATSAPP_NUMBER = ''; // Replace with your WhatsApp number, e.g., '+919999999999'

    // Initialize or load the inquiry list from session storage
    let inquiryList = JSON.parse(sessionStorage.getItem('inquiryList')) || [];
    updateInquiryCount();

    // Function to update the count and visibility
    function updateInquiryCount() {
        inquiryCountSpan.textContent = inquiryList.length;
        if (inquiryList.length > 0) {
            inquiryListContainer.classList.remove('hidden');
        } else {
            inquiryListContainer.classList.add('hidden');
        }
    }

    // Function to handle the WhatsApp redirect for the full list
    function sendInquiryList() {
        const message = `I would like to inquire about these products: ${inquiryList.join(', ')}.`;
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        inquiryList = []; // Clear the list after sending
        sessionList.removeItem('inquiryList');
        updateInquiryCount();
        window.location.href = whatsappUrl;
    }

    // Listen for clicks on the 'Add to Inquiry List' buttons
    inquiryButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productCode = e.target.dataset.code;
            inquiryList.push(productCode);
            sessionStorage.setItem('inquiryList', JSON.stringify(inquiryList));
            updateInquiryCount();
            
            // Check if the list has reached 10 products
            if (inquiryList.length >= 10) {
                sendInquiryList();
            }
        });
    });

    // Listen for clicks on the 'View Inquiry List' button
    viewInquiryListButton.addEventListener('click', sendInquiryList);
    
} else {
    // Fallback for browsers without Web Storage support (unlikely but good practice)
    console.error("Sorry, your browser does not support Web Storage. The inquiry list feature will not work.");
}
