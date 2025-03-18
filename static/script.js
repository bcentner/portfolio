// Custom cursor
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    document.addEventListener('mousemove', (e) => {
        cursor.style.top = e.clientY + 'px';
        cursor.style.left = e.clientX + 'px';
        
        cursorOutline.style.top = e.clientY + 'px';
        cursorOutline.style.left = e.clientX + 'px';
    });

    // Hide cursor when mouse leaves window
    document.addEventListener('mouseout', () => {
        cursor.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });

    document.addEventListener('mouseover', () => {
        cursor.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });

    // Links and buttons hover effect
    const links = document.querySelectorAll('a, button, .project-card, .skill-tag');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.backgroundColor = 'rgba(3, 218, 198, 0.1)';
        });
        
        link.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active nav link on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-item');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Sticky header
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '20px 0';
            header.style.boxShadow = 'none';
        }
    });
    
    // Modified typing effect with fixed prefix
    const typingTextElement = document.getElementById('typing-text');
    const prefix = "I love to ";
    const suffixes = ["write code", "solve problems", "learn new things"];
    let suffixIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPrefixShown = false;
    
    function typeEffect() {
        const currentSuffix = suffixes[suffixIndex];
        
        if (!isPrefixShown) {
            // First time: type the whole text including prefix
            if (charIndex < prefix.length + currentSuffix.length) {
                typingTextElement.textContent = (prefix + currentSuffix).substring(0, charIndex + 1);
                charIndex++;
                typingTextElement.classList.add('typing');
                setTimeout(typeEffect, 100);
            } else {
                // When first complete phrase is done
                typingTextElement.classList.remove('typing');
                isPrefixShown = true;
                setTimeout(() => {
                    isDeleting = true;
                    typingTextElement.classList.add('typing');
                    typeEffect();
                }, 1500);
            }
        } else {
            // Prefix is already shown - only modify the suffix
            if (isDeleting) {
                // When deleting text (only delete the suffix part)
                if (charIndex > prefix.length) {
                    typingTextElement.textContent = prefix + currentSuffix.substring(0, charIndex - prefix.length - 1);
                    charIndex--;
                    setTimeout(typeEffect, 50);
                } else {
                    // Deletion of suffix complete
                    isDeleting = false;
                    suffixIndex = (suffixIndex + 1) % suffixes.length;
                    setTimeout(typeEffect, 200);
                }
            } else {
                // When typing text (only type the suffix part)
                if (charIndex < prefix.length + currentSuffix.length) {
                    typingTextElement.textContent = prefix + currentSuffix.substring(0, charIndex - prefix.length + 1);
                    charIndex++;
                    setTimeout(typeEffect, 100);
                } else {
                    // Typing complete
                    typingTextElement.classList.remove('typing');
                    setTimeout(() => {
                        isDeleting = true;
                        typingTextElement.classList.add('typing');
                        typeEffect();
                    }, 1500);
                }
            }
        }
    }
    
    // Start the typing effect
    typeEffect();
});

// Smooth scrolling for navigation links
document.querySelectorAll("nav a").forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        const href = this.getAttribute("href");
        
        // Only apply smooth scrolling if it's an internal link
        if (href.startsWith("#")) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: "smooth"
            });
        }
        // If it's an external link, do nothing special
        // (the browser will open it normally)
    });
});
