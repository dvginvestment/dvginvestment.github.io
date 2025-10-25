// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = '#000000';
        navbar.style.boxShadow = '0 2px 20px rgba(255, 255, 255, 0.1)';
    } else {
        navbar.style.background = '#000000';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Add slide-in animations to cards
    const cards = document.querySelectorAll('.service-card, .portfolio-card, .advantage-card');
    cards.forEach(card => {
        card.classList.add('scale-in');
        observer.observe(card);
    });

    // Add slide-in-left to about content
    const aboutText = document.querySelector('.about-text');
    if (aboutText) {
        aboutText.classList.add('slide-in-left');
        observer.observe(aboutText);
    }

    // Add slide-in-right to about image
    const aboutImage = document.querySelector('.about-image');
    if (aboutImage) {
        aboutImage.classList.add('slide-in-right');
        observer.observe(aboutImage);
    }

    // Add slide-in animations to contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.classList.add('slide-in-left');
        item.style.animationDelay = `${index * 0.2}s`;
        observer.observe(item);
    });

});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h4');
    counters.forEach(counter => {
        const target = counter.textContent;
        if (target === '100%') {
            let current = 0;
            const timer = setInterval(() => {
                current += 1;
                counter.textContent = current + '%';
                if (current >= 100) {
                    clearInterval(timer);
                }
            }, 20);
        }
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});


// Add hover effects to portfolio cards
document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #000000, #1a1a1a);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add custom cursor effect
function createCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(0, 0, 0, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.display = 'block';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
    });
    
    // Scale cursor on hover
    document.querySelectorAll('a, button, .card, .service-card, .portfolio-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Initialize custom cursor (uncomment if desired)
// createCustomCursor();

// Add smooth reveal animations for text
function revealText() {
    const textElements = document.querySelectorAll('h1, h2, h3, p');
    textElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    textElements.forEach(el => textObserver.observe(el));
}

// Initialize text reveal
revealText();

// Add AI data stream effect to hero section
function createAIDataStreams() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    hero.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let animationId;
    
    // Data nodes
    const nodes = [];
    const connections = [];
    
    // Initialize nodes
    function initNodes() {
        for (let i = 0; i < 15; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 2,
                pulse: Math.random() * Math.PI * 2,
                connections: []
            });
        }
    }
    
    // Update canvas size
    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    
    // Draw connections between nearby nodes
    function drawConnections() {
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    const opacity = 1 - (distance / 150);
                    ctx.globalAlpha = opacity * 0.3;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }
        ctx.globalAlpha = 1;
    }
    
    // Draw data streams
    function drawDataStreams() {
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.6)';
        ctx.lineWidth = 2;
        
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            const streamLength = 30;
            const angle = Math.atan2(node.vy, node.vx);
            
            ctx.globalAlpha = 0.6;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(
                node.x - Math.cos(angle) * streamLength,
                node.y - Math.sin(angle) * streamLength
            );
            ctx.stroke();
        }
        ctx.globalAlpha = 1;
    }
    
    // Draw nodes
    function drawNodes() {
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            const pulseSize = node.size + Math.sin(node.pulse) * 1;
            
            // Outer glow
            ctx.fillStyle = 'rgba(0, 255, 255, 0.2)';
            ctx.beginPath();
            ctx.arc(node.x, node.y, pulseSize * 2, 0, Math.PI * 2);
            ctx.fill();
            
            // Inner core
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.beginPath();
            ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
            ctx.fill();
            
            // Data particles around nodes
            for (let j = 0; j < 3; j++) {
                const angle = (node.pulse + j * Math.PI * 2 / 3) % (Math.PI * 2);
                const radius = pulseSize + 15;
                const px = node.x + Math.cos(angle) * radius;
                const py = node.y + Math.sin(angle) * radius;
                
                ctx.fillStyle = 'rgba(0, 255, 255, 0.6)';
                ctx.beginPath();
                ctx.arc(px, py, 1, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
    
    // Update nodes
    function updateNodes() {
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            
            // Update position
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off edges
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
            
            // Keep within bounds
            node.x = Math.max(0, Math.min(canvas.width, node.x));
            node.y = Math.max(0, Math.min(canvas.height, node.y));
            
            // Update pulse
            node.pulse += 0.05;
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        drawConnections();
        drawDataStreams();
        drawNodes();
        updateNodes();
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Initialize
    resizeCanvas();
    initNodes();
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        resizeCanvas();
    });
}

// Initialize AI data streams
createAIDataStreams();
