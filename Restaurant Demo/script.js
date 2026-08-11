

// ========================================
// MENU CATEGORY SWITCHING
// ========================================

const categoryButtons = document.querySelectorAll(".category");
const categoryContents = document.querySelectorAll(".category-content");

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        const category = button.dataset.category;

        // Remove active from all buttons
        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Add active to clicked button
        button.classList.add("active");

        // Hide all category sections
        categoryContents.forEach(section => {
            section.classList.remove("active");
        });

        // Show selected category
        const selectedSection = document.getElementById(category);

        if (selectedSection) {
            selectedSection.classList.add("active");
        }

    });

});


// ========================================
// SCROLL REVEAL ANIMATION
// ========================================

const revealElements = document.querySelectorAll(
    ".menu-box, .menu-order, .section-heading, .dish-card, .footer-brand, .footer-links, .footer-bottom"
);

console.log("SCRIPT.JS IS RUNNING");
console.log("Elements found:", revealElements.length);


// Add animation class
revealElements.forEach(element => {
    element.classList.add("scroll-reveal");
});


// Create observer
const revealObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            console.log("Animating:", entry.target);

            entry.target.classList.add("show");

            observer.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.1
});


// Observe elements
revealElements.forEach(element => {
    revealObserver.observe(element);
});