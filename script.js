let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const progressBar = document.querySelector('.progress-bar');
const slideNumber = document.querySelector('.slide-number');

function updateSlide() {
    slides.forEach((slide, index) => {
        // Remove active class to reset animations
        slide.classList.remove('active');
        
        if (index === currentSlide) {
            // Small delay to ensure the browser registers the removal before adding it back
            // This allows animations to re-trigger
            setTimeout(() => {
                slide.classList.add('active');
            }, 50);
        }
    });

    const progress = ((currentSlide + 1) / slides.length) * 100;
    progressBar.style.width = `${progress}%`;
    slideNumber.textContent = `Halaman ${currentSlide + 1} / ${slides.length}`;
}

document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentSlide < slides.length - 1) {
        currentSlide++;
        updateSlide();
    }
});

document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlide();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            updateSlide();
        }
    } else if (e.key === 'ArrowLeft') {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlide();
        }
    } else if (e.key === 'Escape') {
        closeModal();
    }
});

// Modal Functionality
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const zoomBtns = document.querySelectorAll('.zoom-btn');
const closeModalBtn = document.querySelector('.close-modal');

zoomBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const img = e.currentTarget.parentElement.querySelector('img');
        modal.classList.add('active');
        modalImg.src = img.src;
        document.body.style.overflow = 'hidden';
    });
});

function closeModal() {
    modal.classList.remove('active');
}

modal.addEventListener('click', (e) => {
    if (e.target !== modalImg) {
        closeModal();
    }
});

closeModalBtn.addEventListener('click', closeModal);

// Initial update
updateSlide();
