document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio Script Loaded! DOM fully loaded and parsed.');

    // Set current year in footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Mobile Menu Toggle Functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active'); // Toggles the .active class on the <nav>
            mobileMenuToggle.classList.toggle('active'); // Optional: Toggles .active on the button for styling (e.g., X icon)

            // Accessibility: Update aria-expanded attribute
            const isExpanded = mainNav.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
        });
    } else {
        console.error('Mobile menu toggle button or main navigation not found.');
    }

    if (document.querySelector('.client-logo-swiper')) {
        const clientSwiper = new Swiper('.client-logo-swiper', {
            // Optional parameters
            loop: true,
            slidesPerView: 2, // Start with 2 slides on smallest screens
            spaceBetween: 20,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: { // Enable if you have the swiper-pagination div in HTML
                el: '.swiper-pagination',
                clickable: true,
            },
            // navigation: { // Enable if you have the nav buttons in HTML
            //    nextEl: '.swiper-button-next',
            //    prevEl: '.swiper-button-prev',
            // },
            breakpoints: {
                // when window width is >= 640px
                640: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },
                // when window width is >= 768px
                768: {
                    slidesPerView: 4,
                    spaceBetween: 40
                },
                // when window width is >= 1024px
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 50
                }
            }
        });
    } else {
        console.log('Client logo swiper container not found.');
    }

    // Contact Form Submission with Formspree
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const formData = new FormData(contactForm);
            formStatus.textContent = 'Sending...';
            formStatus.className = ''; // Reset classes

            fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    formStatus.textContent = "Thanks for your message! Denis will be in touch soon.";
                    formStatus.classList.add('success');
                    contactForm.reset(); // Clear the form
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            formStatus.textContent = "Oops! There was a problem submitting your form. Please try again or use the direct contact details.";
                        }
                        formStatus.classList.add('error');
                    })
                }
            }).catch(error => {
                formStatus.textContent = "Oops! There was a problem submitting your form. Please try again or use the direct contact details.";
                formStatus.classList.add('error');
            });
        });
    } else {
        if (!contactForm) console.log('Contact form not found.');
        if (!formStatus) console.log('Form status element not found.');
    }

});