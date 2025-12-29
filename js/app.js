document.addEventListener("DOMContentLoaded", () => {
  // Load products and cart
  let products = JSON.parse(localStorage.getItem("products")) || [
    { name: "Hair Clippers", price: 2500, img: "https://via.placeholder.com/300x180?text=Hair+Clippers", category: "Haircare" },
    { name: "Cosmetics Kit", price: 1800, img: "https://via.placeholder.com/300x180?text=Cosmetics+Kit", category: "Cosmetics" },
    { name: "Premium Shampoo", price: 900, img: "https://via.placeholder.com/300x180?text=Premium+Shampoo", category: "Haircare" }
  ];

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let selectedCategory = "all";

  const searchInput = document.getElementById("search");
  const sortSelect = document.getElementById("sort");
  const container = document.querySelector(".all-products");

  function renderCart(){
    const cartContainer = document.querySelector(".cart-items");
    const totalDisplay = document.querySelector(".total");
    if(!cartContainer) return;

    cartContainer.innerHTML = "";
    let total = 0;
    cart.forEach((item,index)=>{
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
    if(totalDisplay) totalDisplay.innerText = `Total: KES ${total}`;
    localStorage.setItem("cart", JSON.stringify(cart));

    // Cart events
    cartContainer.querySelectorAll("input").forEach(input=>{
      input.addEventListener("input", e=>{
        const idx = e.target.dataset.index;
        cart[idx].qty = Number(e.target.value);
        renderCart();
      });
    });

    cartContainer.querySelectorAll("button").forEach(btn=>{
      btn.addEventListener("click", e=>{
        const idx = e.target.dataset.index;
        cart.splice(idx,1);
        renderCart();
      });
    });
  }

  renderCart();

  function performSearchAndSort(){
    const query = searchInput ? searchInput.value.toLowerCase() : "";
    let sortedProducts = [...products];

    // Sorting
    if(sortSelect){
      const value = sortSelect.value;
      switch(value){
        case "price-asc": sortedProducts.sort((a,b)=>a.price-b.price); break;
        case "price-desc": sortedProducts.sort((a,b)=>b.price-a.price); break;
        case "name-asc": sortedProducts.sort((a,b)=>a.name.localeCompare(b.name)); break;
      }
    }

    // Clear container
    if(container) container.innerHTML = "";

    let found = false;
    sortedProducts.forEach(p=>{
      if((selectedCategory==="all" || p.category===selectedCategory) && (p.name.toLowerCase().includes(query) || query==="")){
        const regex = query!=="" ? new RegExp(`(${query})`,"gi") : null;
        const highlightedName = regex ? p.name.replace(regex,"<span class='highlight'>$1</span>") : p.name;

        const div = document.createElement("div");
        div.classList.add("product");
        div.setAttribute("data-category",p.category);
        div.innerHTML = `
          <a href="product.html?item=${encodeURIComponent(p.name)}">
            <img src="${p.img}" alt="${p.name}">
            <h3>${highlightedName}</h3>
          </a>
          <p>KES ${p.price}</p>
          <button class="add-to-cart">Add to Cart</button>
        `;
        container.appendChild(div);
        found = true;
      }
    });

    // No results
    let noResults = document.getElementById("no-results");
    if(!noResults && container){
      noResults = document.createElement("div");
      noResults.id = "no-results";
      noResults.style.textAlign = "center";
      noResults.style.padding = "20px";
      noResults.style.color = "#f44336";
      container.appendChild(noResults);
    }
    if(noResults) noResults.innerText = found ? "" : "No products found";

    // Add to Cart buttons
    document.querySelectorAll("button.add-to-cart").forEach(btn=>{
      btn.addEventListener("click", e=>{
        const prodDiv = e.target.parentElement;
        const name = prodDiv.querySelector("h3").innerText.replace(/<[^>]*>/g,"");
        const price = Number(prodDiv.querySelector("p").innerText.replace(/[^0-9]/g,""));
        const existing = cart.find(c=>c.name===name);
        if(existing) existing.qty=(existing.qty||1)+1;
        else cart.push({name,price,qty:1});
        localStorage.setItem("cart",JSON.stringify(cart));
        alert(`${name} added to cart at BMG-TECH!`);
        renderCart();
      });
    });
  }

  // Events
  if(searchInput){
    searchInput.addEventListener("input", performSearchAndSort);
    searchInput.addEventListener("keydown", e=>{
      if(e.key==="Enter") performSearchAndSort();
    });
  }

  if(sortSelect){
    sortSelect.addEventListener("change", performSearchAndSort);
  }

  document.querySelectorAll(".category-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      selectedCategory = btn.dataset.category;
      performSearchAndSort();
    });
  });

  performSearchAndSort();
});
