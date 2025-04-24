// Función para manejar animaciones al hacer scroll
document.addEventListener('DOMContentLoaded', () => {
    // Animación para los contadores
    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.innerText);
            const count = 0;
            const speed = 50;
            
            const updateCount = () => {
                const increment = Math.ceil(target / (1000 / speed));
                let currentCount = parseInt(counter.innerText) || 0;
                
                if (currentCount < target) {
                    counter.innerText = currentCount + increment;
                    setTimeout(updateCount, speed);
                } else {
                    counter.innerText = target;
                }
            };
            
            updateCount();
        });
    };

    // Detectar elementos visibles durante el scroll
    const observeElements = () => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('counter-container')) {
                        animateCounters();
                    }
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observar las secciones principales
        const sections = document.querySelectorAll('.hero, .features, .services, .contact');
        sections.forEach(section => {
            observer.observe(section);
        });
        
        // Observar el contenedor de contadores
        const counterContainer = document.querySelector('.counter-container');
        if (counterContainer) {
            observer.observe(counterContainer);
        }
    };
    
    observeElements();

    // Navegación suave al hacer click en los enlaces del menú
    const smoothScroll = () => {
        const menuLinks = document.querySelectorAll('.menu a');
        
        menuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                
                if (targetId !== '#') {
                    e.preventDefault();
                    
                    const targetElement = document.querySelector(targetId);
                    const headerHeight = document.querySelector('header').offsetHeight;
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                    
                    // Actualizar clase active
                    menuLinks.forEach(link => link.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        });
    };
    
    smoothScroll();

    // Cambiar clase active en el menú durante el scroll
    const updateMenuOnScroll = () => {
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            let current = '';
            const headerHeight = document.querySelector('header').offsetHeight;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - headerHeight - 100;
                const sectionHeight = section.offsetHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = `#${section.getAttribute('id')}`;
                }
            });
            
            document.querySelectorAll('.menu a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === current) {
                    link.classList.add('active');
                }
            });
        });
    };
    
    updateMenuOnScroll();

    // Formulario de contacto
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Aquí se implementaría la lógica para enviar el formulario
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // Simulación de envío exitoso
            alert('Thank you for contacting us! We will respond shortly.');
            contactForm.reset();
        });
    }
}); 