document.addEventListener('DOMContentLoaded', function() {
    const images = [
        'images/A Dumb Sequel/page+1web.png',
        'images/A Dumb Sequel/page+2web.png',
        'images/A Dumb Sequel/page+3web.png',
        'images/A Dumb Sequel/page+4web.png',
        'images/A Dumb Sequel/page+5web.png',
        'images/A Dumb Sequel/page+6web.png',
        'images/A Dumb Sequel/page+7web.png',
        'images/A Dumb Sequel/page+8web.png',
        'images/A Dumb Sequel/page+9web.png',
        'images/A Dumb Sequel/page+10web.png',
        'images/A Dumb Sequel/page+11web.png',
        'images/A Dumb Sequel/page+12web.png',
        'images/A Dumb Sequel/page+13web.png',
        'images/A Dumb Sequel/page+14web.png',
        'images/A Dumb Sequel/page+15web.png',
        'images/A Dumb Sequel/page+16web.png',
        'images/A Dumb Sequel/page+17web.png',
        'images/A Dumb Sequel/page+18web.png',
        'images/A Dumb Sequel/page+19web.png',
        'images/A Dumb Sequel/page+20web.png',
        'images/A Dumb Sequel/page+21web.png',
        'images/A Dumb Sequel/page+22web.png',
        'images/A Dumb Sequel/page+23web.png',
        'images/A Dumb Sequel/page+24web.png',
        'images/A Dumb Sequel/page+25web.png',
        'images/A Dumb Sequel/page+26web.png',
        'images/A Dumb Sequel/page+27web.png',
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