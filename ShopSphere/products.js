
window.products = [
  {
    id: 1,
    name: "Classic T-Shirt",
    category: "Fashion",
    price: 599,
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTSObKygUxDD4SrVS_rJnRVRY6yM7kB4Iu2BuoSsggsSWeOYKcKXpZvbeeNvtHIkCf_9NbOaNJO2eHISvbA346dvAeRSeKRaIyfJEmH0P0Jcap9l8mojm9h&usqp=CAc",
    description: "Comfortable cotton T-shirt for everyday use."
  },
  {
    id: 2,
    name: "Running Shoes",
    category: "Fashion",
    price: 1499,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc7qJLpiXTjjFQvW97jCOP3yyqG3FyISPqvf6HuHQGcw&s=10",
    description: "Lightweight shoes for walking and running."
  },
  {
    id: 3,
    name: "Smart Watch",
    category: "Electronics",
    price: 1999,
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRFiC3zM8pPYqYN-xAhAtLrNLmiYlTFmyxSkEkIV9MAFj3NOI_wU7kLNVPJ8WjMsSOOJAbpNSBOwf727sl2uDWm3ookUqgEVYTGu2l2X2UmsifQMEthwhqMSomOHFxMyn370L03CA&usqp=CAc",
    description: "A stylish smartwatch for everyday activities."
  },
  {
    id: 4,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 1299,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrf6yaiZgsDa9FegjeUpy9jDvM05S00QBK5QwcDzlkjQ&s=10",
    description: "Wireless headphones for music and entertainment."
  },
  {
    id: 5,
    name: "Travel Backpack",
    category: "Accessories",
    price: 899,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuL6oUCa3HC5dOr0m9zDGM9vWuPZ_aoqb8MM3cPYRxyw&s=10",
    description: "A practical backpack for college and travel."
  },
  {
    id: 6,
    name: "Sunglasses",
    category: "Accessories",
    price: 799,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRalDbBfufa4ST8xmpT8_Ft-QgmmbBUhKSw-32J5uVJpg&s",
    description: "Modern sunglasses for everyday style."
  },
  {
    id: 7,
    name: "Desk Lamp",
    category: "Home",
    price: 699,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJlKtEFGnb_dGB3Z6CLeFf6Koe9Ntf1Eoy4J7yWxulbQ&s=10",
    description: "A desk lamp for your study or work table."
  },
  {
    id: 8,
    name: "Water Bottle",
    category: "Home",
    price: 399,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwDMRwXQLNiTfONWfW216wdXN3UFI9VDoAQ0Nonbk9Uw&s=10",
    description: "A reusable bottle for everyday hydration."
  }
];

window.getCart = function () {
  try {
    const cart = JSON.parse(localStorage.getItem("shopCart")) || [];
    return Array.isArray(cart) ? cart : [];
  } catch {
    return [];
  }
};

window.saveCart = function (cart) {
  localStorage.setItem("shopCart", JSON.stringify(cart));
  window.updateCartCount?.();
};

window.addToCart = function (id) {
  const product = window.products.find(p => p.id === Number(id));
  if (!product) return;

  const cart = window.getCart();
  const existing = cart.find(p => p.id === product.id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  window.saveCart(cart);
  alert(product.name + " added to cart!");
};

window.productCard = function (p) {
  return `
    <div class="col-12 col-sm-6 col-lg-3">
      <div class="card product-card h-100">
        <img src="${p.image}" alt="${p.name}" class="card-img-top">
        <div class="card-body d-flex flex-column">
          <span class="badge text-bg-light align-self-start">${p.category}</span>
          <h5 class="card-title mt-2">${p.name}</h5>
          <p class="product-price">₹${p.price.toLocaleString("en-IN")}</p>
          <div class="mt-auto d-grid gap-2">
            <a href="product-details.html?id=${p.id}"
              class="btn btn-outline-dark">View Details</a>
            <button class="btn btn-primary"
              onclick="addToCart(${p.id})">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>`;
};

document.addEventListener("DOMContentLoaded", () => {
  const featured = document.getElementById("featuredProducts");
  if (featured) {
    featured.innerHTML = window.products
      .slice(0, 4).map(window.productCard).join("");
  }

  const list = document.getElementById("productList");
  const search = document.getElementById("searchInput");
  const filter = document.getElementById("categoryFilter");

  function showProducts() {
    if (!list) return;

    const keyword = (search?.value || "").trim().toLowerCase();
    const category = filter?.value || "All";

    const filtered = window.products.filter(p =>
      p.name.toLowerCase().includes(keyword) &&
      (category === "All" || p.category === category)
    );

    list.innerHTML = filtered.length
      ? filtered.map(window.productCard).join("")
      : `<div class="col-12">
           <div class="alert alert-warning">No products found.</div>
         </div>`;
  }

  search?.addEventListener("input", showProducts);
  filter?.addEventListener("change", showProducts);
  showProducts();

  const detail = document.getElementById("productDetail");

  if (detail) {
    const id = Number(new URLSearchParams(location.search).get("id"));
    const p = window.products.find(item => item.id === id);

    if (!p) {
      detail.textContent = "Product not found. Please browse all products.";
      return;
    }

    const row = document.createElement("div");
    row.className = "row g-4 align-items-center";

    const imageCol = document.createElement("div");
    imageCol.className = "col-md-6";

    const img = document.createElement("img");
    img.src = p.image;
    img.alt = p.name;
    img.className = "img-fluid rounded";
    imageCol.appendChild(img);

    const infoCol = document.createElement("div");
    infoCol.className = "col-md-6";

    const category = document.createElement("span");
    category.className = "badge text-bg-secondary";
    category.textContent = p.category;

    const title = document.createElement("h2");
    title.className = "mt-3";
    title.textContent = p.name;

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = "₹" + p.price.toLocaleString("en-IN");

    const description = document.createElement("p");
    description.textContent = p.description;

    const add = document.createElement("button");
    add.className = "btn btn-primary me-2";
    add.textContent = "Add to Cart";
    add.addEventListener("click", () => window.addToCart(p.id));

    const back = document.createElement("a");
    back.href = "products.html";
    back.className = "btn btn-outline-secondary";
    back.textContent = "Continue Shopping";

    infoCol.append(category, title, price, description, add, back);
    row.append(imageCol, infoCol);
    detail.replaceChildren(row);
  }
});
