document.addEventListener('DOMContentLoaded', function() {
    const images = [
        'images/doujin2/Nicole Comic pg 1.png',
        'images/doujin2/Nicole Comic pg 2.png',
        'images/doujin2/Nicole Comic pg 3.png',
        'images/doujin2/Nicole Comic pg 4.png',
        'images/doujin2/Nicole Comic pg 5.png',
        'images/doujin2/Nicole Comic pg 6.png',
        'images/doujin2/Nicole Comic pg 7.png',
        'images/doujin2/Nicole Comic pg 8.png',
        'images/doujin2/Nicole Comic pg 9.png',
        'images/doujin2/Nicole Comic pg 10.png',
        'images/doujin2/Nicole Comic pg 11.png',
        'images/doujin2/Nicole Comic pg 12.png',
        'images/doujin2/Nicole Comic pg 13.png',
        'images/doujin2/Nicole Comic pg 14.png',
        // เพิ่มรูปภาพอื่นๆ ตามต้องการ
    ];
    
    let currentPageIndex = 0;
    const currentPage = document.querySelector('.current-page');
    const currentPageNumber = document.getElementById('current-page-number');
    const totalPages = document.getElementById('total-pages');
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');

    // อัพเดทจำนวนหน้าทั้งหมด
    totalPages.textContent = images.length;

    function changePage(index) {
        if (index >= 0 && index < images.length) {
            currentPage.classList.add('page-transition');
            
            setTimeout(() => {
                currentPageIndex = index;
                currentPage.src = images[currentPageIndex];
                currentPageNumber.textContent = currentPageIndex + 1;
                currentPage.classList.remove('page-transition');
                
                // อัพเดทสถานะปุ่ม
                prevButton.style.opacity = currentPageIndex === 0 ? '0.5' : '1';
                prevButton.style.cursor = currentPageIndex === 0 ? 'not-allowed' : 'pointer';
                nextButton.style.opacity = currentPageIndex === images.length - 1 ? '0.5' : '1';
                nextButton.style.cursor = currentPageIndex === images.length - 1 ? 'not-allowed' : 'pointer';
            }, 300);
        }
    }

    prevButton.addEventListener('click', () => {
        if (currentPageIndex > 0) {
            changePage(currentPageIndex - 1);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPageIndex < images.length - 1) {
            changePage(currentPageIndex + 1);
        }
    });

    // เพิ่มการควบคุมด้วยแป้นพิมพ์
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevButton.click();
        } else if (e.key === 'ArrowRight') {
            nextButton.click();
        }
    });

    // รองรับ Fullscreen mode
    const fullscreenToggle = document.getElementById('fullscreen-toggle');
    const readerContainer = document.querySelector('.reader-container');

    fullscreenToggle.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            readerContainer.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    });

    // รองรับการ swipe บนมือถือ
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeLength = touchEndX - touchStartX;

        if (Math.abs(swipeLength) > swipeThreshold) {
            if (swipeLength > 0) {
                // Swipe ขวา (ย้อนกลับ)
                changePage(currentPageIndex - 1);
            } else {
                // Swipe ซ้าย (ไปหน้าถัดไป)
                changePage(currentPageIndex + 1);
            }
        }
    }
});