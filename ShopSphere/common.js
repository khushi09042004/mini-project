window.updateCartCount = function () {
  let cart = [];

  try {
    cart = JSON.parse(localStorage.getItem("shopCart")) || [];
  } catch {
    cart = [];
  }

  const count = cart.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  document.querySelectorAll(".cart-count").forEach(element => {
    element.textContent = count;
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");

  if (header) {
    header.innerHTML = `
      <nav class="navbar navbar-expand-lg navbar-dark shop-navbar">
        <div class="container">
          <a class="navbar-brand" href="index.html">ShopSphere</a>

          <button class="navbar-toggler" type="button"
            data-bs-toggle="collapse" data-bs-target="#mainNav"
            aria-controls="mainNav" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="mainNav">
            <ul class="navbar-nav ms-auto align-items-lg-center">
              <li class="nav-item"><a class="nav-link" href="home.html">Home</a></li>
              <li class="nav-item"><a class="nav-link" href="products.html">Products</a></li>
              <li class="nav-item"><a class="nav-link" href="orders.html">My Orders</a></li>
              <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
              <li class="nav-item">
                <a class="nav-link" href="cart.html">
                  Cart (<span class="cart-count">0</span>)
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>`;
  }

  const footer = document.getElementById("site-footer");

  if (footer) {
    footer.innerHTML = `
      <footer class="shop-footer text-center">
        <div class="container">
          <h5>ShopSphere</h5>
          <p class="mb-1">Here is Biggest deal for Shopping</p>
         
        </div>
      </footer>`;
  }

  window.updateCartCount();
});
