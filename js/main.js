// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = bookingForm.querySelector('input[type="text"]').value;
            const email = bookingForm.querySelectorAll('input[type="email"]')[0].value;
            const phone = bookingForm.querySelector('input[type="tel"]').value;
            const animals = bookingForm.querySelectorAll('input[type="text"]')[1].value;
            const message = bookingForm.querySelector('textarea').value;
            const date = bookingForm.querySelector('input[type="date"]').value;
            
            // Create mailto link (alternative to backend)
            const subject = 'Kate Helps Animals: Meet & Greet Request from ' + name;
            const body = `New Meet & Greet Request\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nAnimals: ${animals}\nPreferred Date: ${date}\n\nMessage:\n${message}`;
            
            // Send email via mailto or FormSubmit service
            const mailtoLink = `mailto:kha@kabyers.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Alternative: Use FormSubmit.co for backend form handling
            // This approach is more reliable than mailto
            fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    animals: animals,
                    date: date,
                    message: message
                })
            })
            .then(response => {
                if (response.ok) {
                    alert('Thank you! Kate will contact you within 24 hours to confirm your meet and greet.');
                    bookingForm.reset();
                } else {
                    // Fallback to mailto if form service fails
                    window.location.href = mailtoLink;
                }
            })
            .catch(error => {
                // Fallback to mailto
                window.location.href = mailtoLink;
            });
        });
    }
    
    // Smooth scroll enhancement
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Don't prevent default for form inputs
            if (this.closest('form')) return;
            
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add active class to current nav item
    updateActiveNavItem();
    window.addEventListener('scroll', updateActiveNavItem);
});

function updateActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// Mobile menu toggle (if implemented)
// You can add a hamburger menu here if needed for mobile

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards for fade-in effect
document.querySelectorAll('.credential-card, .service-card, .price-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
