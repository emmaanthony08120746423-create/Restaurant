

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

        // Hide all sections
        categoryContents.forEach(section => {
            section.classList.remove("active");
        });

        // Show selected section
        const selectedSection = document.getElementById(category);

        if (selectedSection) {
            selectedSection.classList.add("active");
        }

    });

});