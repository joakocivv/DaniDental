/**
 * ===================================
 * DANIDENTAL - LANDING PAGE SCRIPTS
 * GSAP Animations & Interactions
 * ===================================
 */

(function() {
    'use strict';

    // ===================================
    // 1. INITIALIZATION
    // ===================================
    
    document.addEventListener('DOMContentLoaded', function() {
        // Forzar visibilidad del botón de WhatsApp inmediatamente
        // (por si GSAP no carga o falla)
        const whatsappBtn = document.querySelector('.whatsapp-float');
        const whatsappLabel = document.querySelector('.whatsapp-label');
        if (whatsappBtn) {
            whatsappBtn.style.opacity = '1';
            whatsappBtn.style.transform = 'scale(1)';
            whatsappBtn.style.visibility = 'visible';
        }
        if (whatsappLabel) {
            whatsappLabel.style.opacity = '1';
            whatsappLabel.style.transform = 'translateY(-50%)';
            
            // Ocultar el label después de 6 segundos
            setTimeout(function() {
                whatsappLabel.classList.add('whatsapp-label--hidden');
            }, 6000);
        }
        
        initMobileMenu();
        initHeaderScroll();
        initSmoothScroll();
        initAnimations();
        initFormValidation();
        initCounterAnimation();
        initSVGPattern();
    });

    // ===================================
    // 2. MOBILE MENU
    // ===================================
    
    function initMobileMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (!menuToggle || !navMenu) return;
        
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (!isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                menuToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ===================================
    // 3. HEADER SCROLL EFFECT
    // ===================================
    
    function initHeaderScroll() {
        const header = document.getElementById('header');
        if (!header) return;
        
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.style.boxShadow = '0 2px 16px rgba(31, 59, 87, 0.08)';
            } else {
                header.style.boxShadow = 'none';
            }
            
            lastScroll = currentScroll;
        }, { passive: true });
    }

    // ===================================
    // 4. SMOOTH SCROLL
    // ===================================
    
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#' || href.length <= 1) return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ===================================
    // 5. GSAP ANIMATIONS
    // ===================================
    
    function initAnimations() {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion || typeof gsap === 'undefined') {
            return;
        }
        
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero animations
        const heroTl = gsap.timeline({
            defaults: {
                ease: 'power2.out'
            }
        });
        
        heroTl
            .from('.hero .eyebrow', {
                opacity: 0,
                y: 20,
                duration: 0.6
            })
            .from('.hero-title', {
                opacity: 0,
                y: 30,
                duration: 0.8
            }, '-=0.4')
            .from('.hero-description', {
                opacity: 0,
                y: 20,
                duration: 0.6
            }, '-=0.5')
            .from('.hero-ctas', {
                opacity: 0,
                y: 20,
                duration: 0.6
            }, '-=0.4')
            .from('.trust-chip', {
                opacity: 0,
                y: 15,
                duration: 0.5,
                stagger: 0.1
            }, '-=0.3')
            .from('.hero-image-bg', {
                x: 100,
                duration: 1.2,
                ease: 'power2.out',
                clearProps: 'transform'
            }, '-=0.6')
            .from('.hero-badge-floating', {
                opacity: 0,
                scale: 0.8,
                y: 20,
                duration: 0.6,
                ease: 'back.out(1.7)'
            }, '-=0.6');
        
        // Section headers
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header, {
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power2.out'
            });
        });
        
        // Service cards
        gsap.utils.toArray('.service-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 40,
                duration: 0.6,
                delay: i * 0.1,
                ease: 'power2.out'
            });
        });
        
        // About visual (image)
        gsap.from('.about-visual', {
            scrollTrigger: {
                trigger: '.about-visual',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            x: -50,
            duration: 0.8,
            ease: 'power2.out'
        });
        
        gsap.from('.about-visual-accent', {
            scrollTrigger: {
                trigger: '.about-visual',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            scale: 0.5,
            duration: 0.6,
            delay: 0.3,
            ease: 'back.out(1.7)'
        });
        
        // Features
        gsap.utils.toArray('.feature').forEach((feature, i) => {
            gsap.from(feature, {
                scrollTrigger: {
                    trigger: feature,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                x: -30,
                duration: 0.6,
                delay: i * 0.15,
                ease: 'power2.out'
            });
        });
        
        // Location cards
        gsap.utils.toArray('.location-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 30,
                duration: 0.6,
                delay: i * 0.1,
                ease: 'power2.out'
            });
        });
        
        // Location map
        gsap.from('.location-map-wrapper', {
            scrollTrigger: {
                trigger: '.location-map-wrapper',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
            ease: 'power2.out'
        });
        
        // Contact form
        gsap.from('.contact-form', {
            scrollTrigger: {
                trigger: '.contact-form',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: 'power2.out'
        });
        
        // Floating WhatsApp button entrance - usando fromTo para asegurar estado final
        gsap.fromTo('.whatsapp-float', 
            { opacity: 0, scale: 0 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                delay: 1.5,
                ease: 'back.out(1.7)',
                clearProps: 'all' // Limpiar propiedades al terminar para no interferir
            }
        );
        
        gsap.fromTo('.whatsapp-label',
            { opacity: 0, x: 30 },
            {
                opacity: 1,
                x: 0,
                duration: 0.5,
                delay: 2,
                ease: 'power2.out',
                clearProps: 'transform',
                onComplete: function() {
                    // Marcar para que se oculte después del tiempo configurado en DOMContentLoaded
                    const label = document.querySelector('.whatsapp-label');
                    if (label && !label.classList.contains('whatsapp-label--hidden')) {
                        // El setTimeout ya está corriendo desde DOMContentLoaded
                    }
                }
            }
        );
        
        // Decorative elements animations
        gsap.from('.deco-tooth', {
            opacity: 0,
            scale: 0.5,
            duration: 1,
            delay: 0.8,
            ease: 'power2.out'
        });
        
        gsap.from('.deco-smile', {
            scrollTrigger: {
                trigger: '.services',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            x: -50,
            duration: 1,
            ease: 'power2.out'
        });
        
        gsap.from('.deco-blob', {
            scrollTrigger: {
                trigger: '.about',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            scale: 0.5,
            duration: 1,
            ease: 'power2.out'
        });
        
        // Decorative shapes in contact section
        gsap.from('.deco-shape', {
            scrollTrigger: {
                trigger: '.contact',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            scale: 0.8,
            duration: 1,
            ease: 'power2.out'
        });
    }

    // ===================================
    // 6. COUNTER ANIMATION
    // ===================================
    
    function initCounterAnimation() {
        const counters = document.querySelectorAll('.stat-number');
        
        if (!counters.length || typeof gsap === 'undefined') return;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const suffix = counter.nextElementSibling && 
                          counter.nextElementSibling.classList.contains('stat-suffix') 
                          ? counter.nextElementSibling.textContent 
                          : '';
            
            ScrollTrigger.create({
                trigger: counter,
                start: 'top 85%',
                onEnter: () => animateCounter(counter, target, suffix),
                once: true
            });
        });
    }
    
    function animateCounter(element, target, suffix) {
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, duration / steps);
    }

    // ===================================
    // 7. SVG PATTERN GENERATION
    // ===================================
    
    function initSVGPattern() {
        const patternContainer = document.querySelector('.hero-pattern');
        if (!patternContainer) return;
        
        // Create rich SVG pattern based on the DaniDental logo curves
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('viewBox', '0 0 1200 800');
        svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
        
        // Multiple curved paths inspired by the logo's smile curve - MORE VISIBLE
        const paths = [
            { d: 'M-50,200 Q200,50 450,200 T950,250 T1300,200', stroke: '#C0785C', width: 4, opacity: 0.6 },
            { d: 'M-100,350 Q250,200 500,350 T1000,400 T1350,350', stroke: '#A2C4C9', width: 3, opacity: 0.5 },
            { d: 'M0,500 Q300,350 600,500 T1200,550', stroke: '#1F3B57', width: 3, opacity: 0.35 },
            { d: 'M100,650 Q400,500 700,650 T1300,700', stroke: '#C0785C', width: 2.5, opacity: 0.45 },
            { d: 'M-50,100 Q350,0 700,120 T1250,80', stroke: '#A2C4C9', width: 2, opacity: 0.3 },
            { d: 'M200,50 Q500,180 800,50 T1200,120', stroke: '#1F3B57', width: 1.5, opacity: 0.2 },
            { d: 'M-80,750 Q300,600 650,750 T1300,780', stroke: '#C0785C', width: 2, opacity: 0.3 },
        ];
        
        paths.forEach((p, i) => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', p.d);
            path.setAttribute('stroke', p.stroke);
            path.setAttribute('stroke-width', p.width);
            path.setAttribute('fill', 'none');
            path.setAttribute('opacity', p.opacity);
            path.setAttribute('stroke-linecap', 'round');
            
            // Animate stroke draw
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
            
            svg.appendChild(path);
        });
        
        // Add decorative circles (tooth/dental inspired) - MORE PROMINENT
        const circles = [
            { cx: 150, cy: 150, r: 50, fill: '#C0785C', opacity: 0.12 },
            { cx: 900, cy: 200, r: 75, fill: '#A2C4C9', opacity: 0.15 },
            { cx: 600, cy: 600, r: 60, fill: '#C0785C', opacity: 0.1 },
            { cx: 1050, cy: 650, r: 45, fill: '#1F3B57', opacity: 0.08 },
            { cx: 400, cy: 400, r: 35, fill: '#A2C4C9', opacity: 0.1 },
            { cx: 800, cy: 450, r: 40, fill: '#C0785C', opacity: 0.08 },
        ];
        
        circles.forEach(c => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', c.cx);
            circle.setAttribute('cy', c.cy);
            circle.setAttribute('r', c.r);
            circle.setAttribute('fill', c.fill);
            circle.setAttribute('opacity', c.opacity);
            svg.appendChild(circle);
        });
        
        patternContainer.appendChild(svg);
        
        // Animate SVG paths on load and scroll
        if (typeof gsap !== 'undefined') {
            gsap.utils.toArray('.hero-pattern path').forEach((path, i) => {
                gsap.to(path, {
                    scrollTrigger: {
                        trigger: '.hero',
                        start: 'top center',
                        toggleActions: 'play none none reverse'
                    },
                    strokeDashoffset: 0,
                    duration: 2.5,
                    delay: i * 0.2,
                    ease: 'power2.inOut'
                });
            });
            
            // Floating circles animation
            gsap.utils.toArray('.hero-pattern circle').forEach((circle, i) => {
                gsap.to(circle, {
                    y: '-=20',
                    duration: 3 + i * 0.5,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: i * 0.3
                });
            });
        }
        
        // Animate deco circles
        if (typeof gsap !== 'undefined') {
            gsap.utils.toArray('.deco-circle').forEach((circle, i) => {
                gsap.to(circle, {
                    y: '-=30',
                    x: '+=' + (i % 2 === 0 ? 10 : -10),
                    duration: 4 + i,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: i * 0.5
                });
            });
        }
    }

    // ===================================
    // 8. FORM VALIDATION
    // ===================================
    
    function initFormValidation() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        const fields = {
            nombre: {
                element: document.getElementById('nombre'),
                error: document.getElementById('nombreError'),
                validate: (value) => {
                    if (!value.trim()) return 'El nombre es obligatorio';
                    if (value.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres';
                    return '';
                }
            },
            email: {
                element: document.getElementById('email'),
                error: document.getElementById('emailError'),
                validate: (value) => {
                    if (!value.trim()) return 'El email es obligatorio';
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) return 'Ingresá un email válido';
                    return '';
                }
            },
            telefono: {
                element: document.getElementById('telefono'),
                error: document.getElementById('telefonoError'),
                validate: (value) => {
                    if (!value.trim()) return 'El teléfono es obligatorio';
                    const phoneRegex = /^[0-9+\-\s()]{8,}$/;
                    if (!phoneRegex.test(value)) return 'Ingresá un teléfono válido';
                    return '';
                }
            },
            consent: {
                element: document.getElementById('consent'),
                error: null,
                validate: (value, element) => {
                    if (!element.checked) return 'Debés aceptar la política de privacidad';
                    return '';
                }
            }
        };
        
        // Real-time validation
        Object.keys(fields).forEach(key => {
            const field = fields[key];
            const eventType = field.element.type === 'checkbox' ? 'change' : 'blur';
            
            field.element.addEventListener(eventType, function() {
                validateField(key);
            });
            
            field.element.addEventListener('input', function() {
                if (field.error && field.error.textContent) {
                    validateField(key);
                }
            });
        });
        
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            Object.keys(fields).forEach(key => {
                const fieldValid = validateField(key);
                if (!fieldValid) isValid = false;
            });
            
            if (isValid) {
                // Simulate form submission
                submitForm(form);
            }
        });
        
        function validateField(key) {
            const field = fields[key];
            const value = field.element.type === 'checkbox' ? field.element.checked : field.element.value;
            const error = field.validate(value, field.element);
            
            if (field.error) {
                field.error.textContent = error;
            }
            
            if (error) {
                field.element.classList.add('error');
                field.element.setAttribute('aria-invalid', 'true');
            } else {
                field.element.classList.remove('error');
                field.element.removeAttribute('aria-invalid');
            }
            
            return !error;
        }
        
        function submitForm(form) {
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Enviando...</span>';
            
            // Simulate API call
            setTimeout(() => {
                form.style.display = 'none';
                document.getElementById('formSuccess').style.display = 'block';
                
                // Reset form after delay
                setTimeout(() => {
                    form.reset();
                    form.style.display = 'flex';
                    document.getElementById('formSuccess').style.display = 'none';
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }, 5000);
            }, 1500);
        }
    }

    // ===================================
    // 9. INTERSECTION OBSERVER FOR LAZY LOADING
    // ===================================
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===================================
    // 10. KEYBOARD NAVIGATION ENHANCEMENTS
    // ===================================
    
    // Allow Enter key to trigger click on service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const link = this.querySelector('.service-link');
                if (link) link.click();
            }
        });
    });

    // ===================================
    // 11. PERFORMANCE OPTIMIZATIONS
    // ===================================
    
    // Throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Apply throttle to scroll-heavy operations
    window.addEventListener('scroll', throttle(function() {
        // Additional scroll-based logic can go here
    }, 100), { passive: true });

    // ===================================
    // 12. ERROR HANDLING
    // ===================================
    
    window.addEventListener('error', function(e) {
        console.error('Error caught:', e.message);
        // Optionally send error to analytics/monitoring service
    });

    // ===================================
    // 13. CONSOLE MESSAGE
    // ===================================
    
    console.log('%c🦷 DaniDental Landing Page', 'font-size: 20px; font-weight: bold; color: #C0785C;');
    console.log('%cDesarrollado con ❤️ siguiendo la identidad visual v1.1', 'font-size: 12px; color: #5C6B7A;');
    console.log('%cEstrategia Bifocal: Track Urgente + Track Nutrición', 'font-size: 12px; color: #1F3B57;');

})();
