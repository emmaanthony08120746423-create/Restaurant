

document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // LOAD CART
    // =========================

    const cart = JSON.parse(localStorage.getItem("spagkingCart")) || [];

    const checkoutItems = document.getElementById("checkoutItems");
    const checkoutTotal = document.getElementById("checkoutTotal");
    const finalTotal = document.getElementById("finalTotal");

    let total = 0;

    // =========================
    // DISPLAY CART
    // =========================

    if (cart.length === 0) {

        checkoutItems.innerHTML = "<p>Your cart is empty.</p>";

    } else {

        checkoutItems.innerHTML = "";

        cart.forEach(item => {

            const itemTotal = item.price * item.quantity;

            total += itemTotal;

            const itemElement = document.createElement("div");

            itemElement.className = "checkout-item";

            itemElement.innerHTML = `
                <div>
                    <strong>${item.name}</strong>
                    <span>x${item.quantity}</span>
                </div>

                <strong>₦${itemTotal.toLocaleString()}</strong>
            `;

            checkoutItems.appendChild(itemElement);

        });
    }

    checkoutTotal.textContent = `₦${total.toLocaleString()}`;
    finalTotal.textContent = `₦${total.toLocaleString()}`;


    // =========================
    // DELIVERY / PICKUP
    // =========================

    const orderTypeInputs =
        document.querySelectorAll('input[name="orderType"]');

    const addressGroup =
        document.getElementById("addressGroup");

    orderTypeInputs.forEach(input => {

        input.addEventListener("change", () => {

            if (input.value === "Pickup" && input.checked) {
                addressGroup.style.display = "none";
            }

            if (input.value === "Delivery" && input.checked) {
                addressGroup.style.display = "block";
            }

        });

    });


    // =========================
    // PLACE ORDER
    // =========================

    const placeOrder =
        document.getElementById("placeOrder");

    placeOrder.addEventListener("click", () => {

        const name =
            document.getElementById("customerName").value.trim();

        const phone =
            document.getElementById("customerPhone").value.trim();

        const address =
            document.getElementById("customerAddress").value.trim();

        const notes =
            document.getElementById("customerNotes").value.trim();

        const orderType =
            document.querySelector(
                'input[name="orderType"]:checked'
            )?.value;

        const payment =
            document.querySelector(
                'input[name="payment"]:checked'
            )?.value;


        // =========================
        // VALIDATION
        // =========================

        if (!name) {
            alert("Please enter your name.");
            return;
        }

        if (!phone) {
            alert("Please enter your phone number.");
            return;
        }

        if (orderType === "Delivery" && !address) {
            alert("Please enter your delivery address.");
            return;
        }

        if (!payment) {
            alert("Please select a payment method.");
            return;
        }

        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }


        // =========================
        // WHATSAPP MESSAGE
        // =========================

        let message = `*NEW SAVANNA TABLE ORDER*\n\n`;

        message += `*Customer:* ${name}\n`;
        message += `*Phone:* ${phone}\n`;
        message += `*Order Type:* ${orderType}\n`;

        if (orderType === "Delivery") {
            message += `*Address:* ${address}\n`;
        }

        message += `*Payment:* ${payment}\n`;

        if (notes) {
            message += `*Notes:* ${notes}\n`;
        }

        message += `\n*ORDER ITEMS*\n`;

        // 🔥 EVERY ITEM IN THE CART
        cart.forEach(item => {

            const itemTotal = item.price * item.quantity;

            message +=
                `• ${item.name} x${item.quantity} — ₦${itemTotal.toLocaleString()}\n`;

        });

        message += `\n*TOTAL: ₦${total.toLocaleString()}*`;


        // =========================
        // OPEN WHATSAPP
        // =========================

        const whatsappNumber = "2348120746423";

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, "_blank");

    });

});