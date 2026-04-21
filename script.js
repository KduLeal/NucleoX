document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });

    const hoverElements = document.querySelectorAll('a, button, .feature-card, .glass-box');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.style.transform = 'scale(2.5)');
        el.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
    });

    // Reveal on scroll
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                if (entry.target.classList.contains('feature-card')) {
                    entry.target.style.transitionDelay = `${entry.target.dataset.delay || 0}ms`;
                }
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach((el, index) => {
        el.dataset.delay = (index % 4) * 100;
        observer.observe(el);
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.height = '70px';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.7)';
            navbar.style.height = '80px';
        }
    });

    // 3D Nucleus Interaction
    const nucleus = document.querySelector('.nucleus-container');
    document.addEventListener('mousemove', (e) => {
        if (nucleus && window.innerWidth > 992) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 30;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 30;
            nucleus.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        }
    });

    // Magnetic Buttons (Subtle)
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const position = btn.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        btn.addEventListener('mouseout', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
});
