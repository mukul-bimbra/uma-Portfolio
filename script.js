document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Reveal elements on scroll (smooth fade up)
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 1s ease-out, transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
        sectionObserver.observe(section);
    });

    // Project Slideshows (Crossfade)
    const slideshows = document.querySelectorAll('.project-slideshow');
    slideshows.forEach(slideshow => {
        const slides = slideshow.querySelectorAll('.slide');
        if (slides.length > 1) {
            let currentIndex = 0;
            setInterval(() => {
                slides[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % slides.length;
                slides[currentIndex].classList.add('active');
            }, 4000); 
        }
    });

    // Sporadic Glitch Effect
    const glitchTitle = document.querySelector('.glitch');
    if (glitchTitle) {
        setInterval(() => {
            glitchTitle.classList.remove('glitch');
            void glitchTitle.offsetWidth; // trigger reflow
            glitchTitle.classList.add('glitch');
        }, 5000);
    }

    // Dynamic Parallax Scrolling Effect for Images (Moves with Mouse Scroll)
    const parallaxImages = document.querySelectorAll('.parallax-img');
    let isTicking = false;

    function updateParallax() {
        parallaxImages.forEach(img => {
            // Find parent container
            const container = img.closest('.parallax-container');
            if (!container) return;
            
            const rect = container.getBoundingClientRect();
            
            // Check if element is inside viewport
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                // Calculate scroll progress (0 to 1) based on position in viewport
                const scrollProgress = 1 - (rect.bottom / (window.innerHeight + rect.height));
                
                // Move image vertically from -15% to 15%
                const yPos = (scrollProgress - 0.5) * 30;
                
                // Apply a subtle parallax translation without scaling
                img.style.transform = `translateY(${yPos * 0.3}%) scale(1)`;
            }
        });
    }

    // Attach to scroll event using requestAnimationFrame for performance
    window.addEventListener('scroll', () => {
        if (!isTicking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                isTicking = false;
            });
            isTicking = true;
        }
    });

    // Initial positioning on load
    updateParallax();
});
