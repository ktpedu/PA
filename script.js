// Premium Interaction Scripts
document.addEventListener('DOMContentLoaded', () => {
    // 1. Smart Navigation Active Link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Animation for Elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.card, .image-box, .summary-card');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${Math.random() * 0.2}s`;
        observer.observe(el);
    });

    // 4. Lightbox Feature for Image Boxes
    const createLightbox = () => {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <img src="" alt="Enlarged Image">
        `;
        document.body.appendChild(lightbox);
        return lightbox;
    };

    const lightbox = document.querySelector('.lightbox') || createLightbox();
    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    document.querySelectorAll('.image-box img, .side-image-container img').forEach(img => {
        // Find parent with cursor pointer or add it
        const parent = img.closest('.image-box') || img.closest('.side-image-container');
        if (parent) {
            parent.style.cursor = 'pointer';
            parent.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        }
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => lightboxImg.src = '', 400); // Clear after transiton
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
        
        // Security: Prevent specific keyboard shortcuts (F12, Inspect, View Source, Save, Print)
        if (e.key === 'F12' || 
           (e.ctrlKey && e.shiftKey && ['I', 'i', 'C', 'c', 'J', 'j'].includes(e.key)) || 
           (e.ctrlKey && ['U', 'u', 'S', 's', 'P', 'p'].includes(e.key))) {
            e.preventDefault();
        }
    });

    // Security: Prevent Right Click
    document.addEventListener('contextmenu', e => e.preventDefault());

    // Security: Prevent Copying
    document.addEventListener('copy', e => e.preventDefault());

    // Security: Prevent Text Selection and Image Dragging
    document.addEventListener('selectstart', e => {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    });
    document.addEventListener('dragstart', e => e.preventDefault());
});
