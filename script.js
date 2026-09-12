document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.custom-navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a.nav-link, a.btn-neon, a.btn-neon-solid');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply smooth scroll if the href points to an ID on this page
            if (this.hash !== "") {
                const hash = this.hash;
                const targetElement = document.querySelector(hash);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Offset for fixed navbar
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            }
        });
    });

    // Scroll Reveal Animation via IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px"
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Form Validation and Submission
    const contactForm = document.getElementById('contact-form');
    const formAlert = document.getElementById('form-alert');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            // Check form validity using HTML5 built-in validation
            if (!contactForm.checkValidity()) {
                contactForm.classList.add('was-validated');
                return;
            }
            
            // If valid, simulate sending and show success message
            const nameInput = document.getElementById('name').value;
            
            // Show Success Alert
            formAlert.className = 'alert alert-success alert-dismissible fade show mt-3';
            formAlert.style.backgroundColor = 'rgba(25, 135, 84, 0.2)';
            formAlert.style.borderColor = '#198754';
            formAlert.style.color = '#fff';
            formAlert.innerHTML = `
                <strong>สำเร็จ!</strong> ขอบคุณที่ติดต่อเราคุณ ${nameInput} ข้อความของคุณถูกส่งเรียบร้อยแล้ว
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
            
            // Reset form
            contactForm.reset();
            contactForm.classList.remove('was-validated');
            
            // Scroll to alert
            formAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Hide alert after 5 seconds
            setTimeout(() => {
                if (formAlert.classList.contains('show')) {
                    const bsAlert = new bootstrap.Alert(formAlert);
                    bsAlert.close();
                }
            }, 5000);
            
        }, false);
    }
});
