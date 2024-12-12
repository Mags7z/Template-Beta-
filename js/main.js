// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add search functionality
const searchBar = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');

searchButton.addEventListener('click', () => {
    const searchTerm = searchBar.value;
    // Add your search logic here
    console.log('Searching for:', searchTerm);
});

// Add loading animation for images
window.addEventListener('load', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '1';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Add click event to all doujin cards
    const doujinCards = document.querySelectorAll('.doujin-card, .content-item');
    
    doujinCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Find the first anchor tag within the card
            const link = card.querySelector('a');
            if (link) {
                // Navigate to the doujin detail page
                window.location.href = link.href;
            }
        });
    });

    // Optional: Add hover effect cursor change
    doujinCards.forEach(card => {
        card.style.cursor = 'pointer';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const prevPageBtn = document.querySelector('.prev-page');
    const nextPageBtn = document.querySelector('.next-page');
    const pageNumbers = document.querySelectorAll('.page-numbers span');

    let currentPage = 1;
    const totalPages = 4;

    // Update pagination state
    function updatePaginationState() {
        // Update active page number
        pageNumbers.forEach((span, index) => {
            span.classList.toggle('active', index + 1 === currentPage);
        });

        // Disable/enable prev and next buttons
        prevPageBtn.classList.toggle('disabled', currentPage === 1);
        nextPageBtn.classList.toggle('disabled', currentPage === totalPages);
    }

    // Previous page
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePaginationState();
            // Here you would typically load the new page of doujin
            console.log(`Loading page ${currentPage}`);
        }
    });

    // Next page
    nextPageBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            updatePaginationState();
            // Here you would typically load the new page of doujin
            console.log(`Loading page ${currentPage}`);
        }
    });

    // Page number click
    pageNumbers.forEach((span, index) => {
        span.addEventListener('click', () => {
            currentPage = index + 1;
            updatePaginationState();
            // Here you would typically load the specific page of doujin
            console.log(`Loading page ${currentPage}`);
        });
    });

    // Initial state
    updatePaginationState();
});