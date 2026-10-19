document.addEventListener("DOMContentLoaded", () => {
  const ordersList = document.getElementById("ordersList");
  if (!ordersList) return;

  const money = amount =>
    "₹" + Number(amount).toLocaleString("en-IN");

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  let orders = [];

  try {
    const saved = JSON.parse(localStorage.getItem("shopOrders")) || [];
    orders = Array.isArray(saved) ? saved : [];
  } catch {
    orders = [];
  }

  if (!orders.length) {
    ordersList.innerHTML = `
      <div class="alert alert-info">
        No orders yet. <a href="products.html">Start shopping</a>.
      </div>`;
    return;
  }

  ordersList.innerHTML = orders.map(order => `
    <div class="card mb-4">
      <div class="card-header d-flex flex-wrap justify-content-between gap-2">
        <strong>Order ${escapeHTML(order.id)}</strong>
        <span>${escapeHTML(order.date)}</span>
      </div>

      <div class="card-body">
        <p><strong>Customer:</strong> ${escapeHTML(order.customer)}</p>
        <p><strong>Delivery address:</strong> ${escapeHTML(order.address)}</p>
        <p><strong>Payment:</strong> ${escapeHTML(order.payment)}</p>

        <h6>Items</h6>
        <ul>
          ${order.items.map(item => `
            <li>${escapeHTML(item.name)} × ${Number(item.quantity)}
              — ${money(Number(item.price) * Number(item.quantity))}</li>
          `).join("")}
        </ul>

        <hr>
        <p>Subtotal: ${money(order.subtotal)}</p>
        <p>Delivery: ${money(order.delivery)}</p>
        <h5>Total: ${money(order.total)}</h5>
        <span class="badge text-bg-success"> Order Placed</span>
      </div>
    </div>
  `).join("");
});
