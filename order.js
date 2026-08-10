

// ===============================
// CART
// ===============================

let cart = [];


// ===============================
// CATEGORY BUTTONS
// ===============================

const categories = document.querySelectorAll(".category");
const categoryContents = document.querySelectorAll(".category-content");

categories.forEach(button => {
    button.addEventListener("click", () => {

        const category = button.dataset.category;

        // Remove active from all buttons
        categories.forEach(btn => {
            btn.classList.remove("active");
        });

        // Hide all sections
        categoryContents.forEach(section => {
            section.classList.remove("active");
        });

        // Activate clicked button
        button.classList.add("active");

        // Show selected category
        const selectedSection = document.getElementById(category);

        if (selectedSection) {
            selectedSection.classList.add("active");
        }
    });
});


// ===============================
// PRODUCT + / - BUTTONS
// ===============================

document.addEventListener("click", function (e) {

    // PLUS
    if (e.target.classList.contains("plus")) {

        const product = e.target.closest(".product, .drink, .side, .protein, .extra");

        if (!product) return;

        const quantityElement = product.querySelector(".quantity");

        let quantity = parseInt(quantityElement.textContent);

        quantity++;

        quantityElement.textContent = quantity;

        updateCart(product, quantity);
    }


    // MINUS
    if (e.target.classList.contains("minus")) {

        const product = e.target.closest(".product, .drink, .side, .protein, .extra");

        if (!product) return;

        const quantityElement = product.querySelector(".quantity");

        let quantity = parseInt(quantityElement.textContent);

        if (quantity > 0) {
            quantity--;
        }

        quantityElement.textContent = quantity;

        updateCart(product, quantity);
    }

});


// ===============================
// UPDATE CART
// ===============================

function updateCart(product, quantity) {

    const nameElement = product.querySelector("h3");
    const priceElement = product.querySelector("p");

    if (!nameElement || !priceElement) return;

    const name = nameElement.textContent.trim();

    // Convert ₦4,900 → 4900
    const price = parseInt(
        priceElement.textContent.replace(/[₦,]/g, "")
    );

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {

        existingItem.quantity = quantity;

        if (quantity === 0) {
            cart = cart.filter(item => item.name !== name);
        }

    } else if (quantity > 0) {

        cart.push({
            name: name,
            price: price,
            quantity: quantity
        });
    }

    updateCartDisplay();
}


// ===============================
// CART DISPLAY
// ===============================

function updateCartDisplay() {

    const selectedItems = document.getElementById("selectedItems");
    const orderTotal = document.getElementById("orderTotal");

    if (!selectedItems || !orderTotal) {
        console.log("Cart elements not found");
        return;
    }

    selectedItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

        const itemTag = document.createElement("span");

        itemTag.className = "selected-item";

        itemTag.textContent = `${item.name} x${item.quantity}`;

        selectedItems.appendChild(itemTag);
    });

    orderTotal.textContent = `NGN ${total.toLocaleString()}`;
}

// ===============================
// NEXT BUTTON
// ===============================

nextBtn.addEventListener("click", () => {

    if (cart.length === 0) {
        alert("Please select at least one item.");
        return;
    }

    localStorage.setItem(
        "spagkingCart",
        JSON.stringify(cart)
    );

    window.location.href = "checkout.html";
});


// ===============================
// BACK BUTTON
// ===============================

document.getElementById("backToOrder").addEventListener("click", () => {

    customerForm.classList.remove("show");
    orderSummary.style.display = "block";

});


// ===============================
// DELIVERY / PICKUP
// ===============================

const typeButtons = document.querySelectorAll(".type-btn");
const addressBox = document.getElementById("addressBox");

let orderType = "Delivery";

typeButtons.forEach(button => {

    button.addEventListener("click", () => {

        typeButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        orderType = button.dataset.type;

        if (orderType === "Pickup") {
            addressBox.style.display = "none";
        } else {
            addressBox.style.display = "block";
        }

    });

});