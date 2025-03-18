document.addEventListener("DOMContentLoaded", function () {
    const text = "Hello, World...";
    const typingText = document.getElementById("typing-text");
    let i = 0;

    function typeEffect() {
        if (i < text.length) {
            typingText.innerText = text.substring(0, i + 1); // Fix here
            i++;
            setTimeout(typeEffect, 100);
        } else {
            typingText.style.borderRight = "none"; // Remove cursor effect after typing
        }
    }

    setTimeout(typeEffect, 500); // Small delay for smoother effect
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
