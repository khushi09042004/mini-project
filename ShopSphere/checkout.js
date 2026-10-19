
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkoutForm");
  if (!form) return;

  const summary = document.getElementById("checkoutSummary");
  const message = document.getElementById("checkoutMessage");
  const submitButton = form.querySelector('button[type="submit"]');
  const money = amount => "₹" + amount.toLocaleString("en-IN");

  function calculateTotal(cart) {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity, 0
    );
    const delivery = subtotal === 0 || subtotal >= 2000 ? 0 : 50;

    return { subtotal, delivery, total: subtotal + delivery };
  }

  function showSummary() {
    const cart = window.getCart();

    if (!cart.length) {
      summary.textContent = "Your cart is empty. Add products before checkout.";
      submitButton.disabled = true;
      return;
    }

    const bill = calculateTotal(cart);
    summary.textContent =
      `Items: ${cart.reduce((sum, p) => sum + p.quantity, 0)} | ` +
      `Subtotal: ${money(bill.subtotal)} | Delivery: ${money(bill.delivery)} | ` +
      `Total: ${money(bill.total)}`;

    submitButton.disabled = false;
  }

  form.addEventListener("submit", event => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const cart = window.getCart();
    if (!cart.length) {
      message.textContent = "Your cart is empty.";
      return;
    }

    const data = new FormData(form);
    const bill = calculateTotal(cart);

    const order = {
      id: "SS" + Date.now(),
      date: new Date().toLocaleString(),
      customer: String(data.get("customerName")).trim(),
      email: String(data.get("customerEmail")).trim(),
      phone: String(data.get("customerPhone")).trim(),
      address: String(data.get("address")).trim(),
      payment: String(data.get("paymentMethod")),
      items: cart,
      ...bill
    };

    try {
      const orders = JSON.parse(localStorage.getItem("shopOrders")) || [];
      orders.unshift(order);
      localStorage.setItem("shopOrders", JSON.stringify(orders));
      window.saveCart([]);

      form.reset();
      summary.textContent = "Your demo order has been saved.";
      message.className = "alert alert-success mt-3";
      message.textContent = `Order ${order.id} placed successfully!`;
      submitButton.disabled = true;

      setTimeout(() => {
       window.location.href = "home.html";
      }, 1500);
    } catch {
      message.className = "alert alert-danger mt-3";
      message.textContent = "Unable to save the order in this browser.";
    }
  });

  showSummary();
});

       