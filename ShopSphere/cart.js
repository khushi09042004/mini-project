document.addEventListener("DOMContentLoaded", () => {
  const cartItems = document.getElementById("cartItems");
  if (!cartItems) return;

  const money = amount => "₹" + amount.toLocaleString("en-IN");

  function renderCart() {
    const cart = window.getCart();

    if (!cart.length) {
      cartItems.innerHTML = `
        <div class="text-center py-4">
          <h4>Your cart is empty</h4>
          <a href="products.html" class="btn btn-primary mt-2">Shop Now</a>
        </div>`;

      document.getElementById("subtotal").textContent = money(0);
      document.getElementById("delivery").textContent = money(0);
      document.getElementById("total").textContent = money(0);
      document.getElementById("checkoutBtn").classList.add("disabled");
      return;
    }

    document.getElementById("checkoutBtn").classList.remove("disabled");

    cartItems.innerHTML = cart.map(item => `
      <div class="d-flex align-items-center gap-3 border-bottom py-3">
        <img src="${item.image}" alt="${item.name}" class="cart-product-img">
        <div class="flex-grow-1">
          <h6>${item.name}</h6>
          <p class="mb-2">${money(item.price)}</p>
          <div class="d-flex align-items-center gap-2 flex-wrap">
            <button class="btn btn-sm btn-outline-secondary"
              data-action="decrease" data-id="${item.id}">−</button>
            <span>${item.quantity}</span>
            <button class="btn btn-sm btn-outline-secondary"
              data-action="increase" data-id="${item.id}">+</button>
            <button class="btn btn-sm btn-outline-danger"
              data-action="remove" data-id="${item.id}">Remove</button>
          </div>
        </div>
        <strong>${money(item.price * item.quantity)}</strong>
      </div>`).join("");

    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity, 0
    );
    const delivery = subtotal >= 2000 ? 0 : 50;

    document.getElementById("subtotal").textContent = money(subtotal);
    document.getElementById("delivery").textContent = money(delivery);
    document.getElementById("total").textContent = money(subtotal + delivery);
  }

  cartItems.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const id = Number(button.dataset.id);
    const action = button.dataset.action;
    let cart = window.getCart();
    const item = cart.find(p => p.id === id);

    if (!item) return;

    if (action === "increase") item.quantity++;
    if (action === "decrease") item.quantity--;
    if (action === "remove" || item.quantity <= 0) {
      cart = cart.filter(p => p.id !== id);
    }

    window.saveCart(cart);
    renderCart();
  });

  renderCart();
});
