// ================= Portfolio Interactive Features =================

document.addEventListener('DOMContentLoaded', function() {
    // ================= Smooth Scrolling =================
    // We now rely on native anchor scrolling plus CSS scroll-margin-top.
    // No custom scrollTo needed (previous approach caused unexpected behavior).

    // ================= Active Navigation Highlighting =================
    const navLinks = document.querySelectorAll('.navbar__link');
    const sections = document.querySelectorAll('section[id]');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const navLink = document.querySelector(`a[href="#${entry.target.id}"]`);
            if (entry.isIntersecting && navLink) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    }, {
        threshold: 0.6
    });

    sections.forEach(section => navObserver.observe(section));

    // ================= Skill Bar Animations =================
    const skillBars = document.querySelectorAll('.skill__bar-fill');
    const skillsSection = document.getElementById('skills');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 200);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (skillsSection) skillObserver.observe(skillsSection);

    // ================= Project Card Hover Effects =================
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
        });
    });

    // ================= Glass Card Hover Effects =================
    const glassCards = document.querySelectorAll('.glass-card');
    glassCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.background = 'rgba(255, 255, 255, 0.08)';
            card.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.background = 'rgba(255, 255, 255, 0.05)';
            card.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        });
    });

    // ================= Hero Subtitle Typing Effect =================
    const heroSubtitle = document.querySelector('.hero__subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        let i = 0;
        (function typeWriter() {
            if (i < originalText.length) {
                heroSubtitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        })();
    }

    // ================= Scroll-to-Top Button =================
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.textContent = '↑';
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });

    scrollBtn.addEventListener('click', () => {
        // Use native smooth behavior
        window.location.hash = '#home';
    });

    // ================= Fade-in Animation on Scroll =================
    const animElements = document.querySelectorAll('.card, .glass-card, .project-card');
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });

    // ================= Status Badge Hover Effects =================
    const statusBadges = document.querySelectorAll('.status');
    statusBadges.forEach(badge => {
        badge.addEventListener('mouseenter', () => badge.style.transform = 'scale(1.05)');
        badge.addEventListener('mouseleave', () => badge.style.transform = 'scale(1)');
    });

    console.info('Portfolio script initialised.');
});

// ============ Styles for Active Nav Link & ScrollBtn Hover (injected) ============
const dynStyle = document.createElement('style');
dynStyle.textContent = `
  .navbar__link.active {
    color: var(--color-primary) !important;
    font-weight: var(--font-weight-bold);
  }
`;
document.head.appendChild(dynStyle);
