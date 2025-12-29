// Load products from localStorage or use default if empty
let products = JSON.parse(localStorage.getItem("products")) || [
  { name: "Hair Clippers", price: 2500, img: "https://via.placeholder.com/300x180/cccccc/000000?text=Hair+Clippers", category: "Haircare" },
  { name: "Cosmetics Kit", price: 1800, img: "https://via.placeholder.com/300x180/cccccc/000000?text=Cosmetics+Kit", category: "Cosmetics" },
  { name: "Premium Shampoo", price: 900, img: "https://via.placeholder.com/300x180/cccccc/000000?text=Premium+Shampoo", category: "Haircare" }
];

document.addEventListener("DOMContentLoaded", () => {
  const featuredContainer = document.getElementById("featured-products");
  const allContainer = document.getElementById("all-products");

  function renderProducts(container, list){
    container.innerHTML = "";
    list.forEach(p => {
      const div = document.createElement("div");
      div.classList.add("product");
      div.setAttribute("data-category", p.category);
      div.innerHTML = `
        <a href="product.html?item=${encodeURIComponent(p.name)}">
          <img src="${p.img}" alt="${p.name}">
          <h3>${p.name}</h3>
        </a>
        <p>KES ${p.price}</p>
        <button class="add-to-cart">Add to Cart</button>
      `;
      container.appendChild(div);
    });
  }

  if (featuredContainer) renderProducts(featuredContainer, products.slice(0,1)); // First product as featured
  if (allContainer) renderProducts(allContainer, products);

  // SEARCH with Enter key
const searchInput = document.getElementById("search");
if(searchInput){
  searchInput.addEventListener("keydown", e => {
    if(e.key === "Enter"){ // Trigger search on Enter
      const query = searchInput.value.toLowerCase();
      document.querySelectorAll(".products .product").forEach(product => {
        const name = product.querySelector("h3").innerText.toLowerCase();
        product.style.display = name.includes(query) ? "block" : "none";
      });
    }
  });
}

  // Category filter
  document.querySelectorAll(".category-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category;
      document.querySelectorAll(".products .product").forEach(p => {
        const pCat = p.dataset.category;
        p.style.display = (category === "all" || pCat === category) ? "block" : "none";
      });
    });
  });

  // Cart functionality (same as before)
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.querySelector(".cart-items");
  const totalDisplay = document.querySelector(".total");

  function renderCart() {
    if (!cartContainer) return;
    cartContainer.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
      total += item.price * (item.qty || 1);
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <span>${item.name}</span>
        <span>KES ${item.price}</span>
        <input type="number" min="1" value="${item.qty || 1}" data-index="${index}">
        <button data-index="${index}">Remove</button>
      `;
      cartContainer.appendChild(div);
    });
    if (totalDisplay) totalDisplay.innerText = `Total: KES ${total}`;
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  renderCart();

  if(cartContainer){
    cartContainer.addEventListener("input", e=>{
      if(e.target.tagName==="INPUT"){
        const idx = e.target.dataset.index;
        cart[idx].qty = Number(e.target.value);
        renderCart();
      }
    });

    cartContainer.addEventListener("click", e=>{
      if(e.target.tagName==="BUTTON"){
        const idx = e.target.dataset.index;
        cart.splice(idx,1);
        renderCart();
      }
    });
  }

  // Homepage Add to Cart
  document.querySelectorAll("button.add-to-cart").forEach(btn=>{
    btn.addEventListener("click", e=>{
      const prodDiv = e.target.parentElement;
      const name = prodDiv.querySelector("h3").innerText;
      const price = Number(prodDiv.querySelector("p").innerText.replace(/[^0-9]/g,""));
      const existing = cart.find(c => c.name === name);
      if(existing) existing.qty = (existing.qty || 1) + 1;
      else cart.push({name, price, qty: 1});
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${name} added to cart at BMG-TECH!`);
      renderCart();
    });
  });
});
