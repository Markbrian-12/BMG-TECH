document.addEventListener("DOMContentLoaded", ()=>{
  const productName = document.getElementById("product-name");
  const productPrice = document.getElementById("product-price");
  const productImg = document.getElementById("product-img");
  const productCategory = document.getElementById("product-category");
  const addBtn = document.getElementById("add-product-btn");
  const tableBody = document.getElementById("product-table-body");

  // ✅ Pre-populated BMG-TECH Products
  let products = JSON.parse(localStorage.getItem("products")) || [
  { name: "Matte Lipstick", price: 1200, img: "images/lipstick1.jpg", category: "Makeup" },
  { name: "Liquid Foundation", price: 2800, img: "images/foundation1.jpg", category: "Makeup" },
  { name: "Eyeshadow Palette", price: 3500, img: "images/eyeshadow1.jpg", category: "Makeup" },
  { name: "Blush Compact", price: 1800, img: "images/blush1.jpg", category: "Makeup" },
  { name: "Beauty Serum", price: 3200, img: "images/serum1.jpg", category: "Skincare" },
  { name: "Facial Cleanser", price: 2600, img: "images/cleanser1.jpg", category: "Skincare" },
  { name: "Moisturizing Cream", price: 2400, img: "images/cream1.jpg", category: "Skincare" },
  { name: "Makeup Brushes Set", price: 2400, img: "images/brushes1.jpg", category: "Accessories" },
  { name: "Setting Powder", price: 2000, img: "images/powder1.jpg", category: "Makeup" },
  { name: "Lip Gloss", price: 1100, img: "images/lipgloss1.jpg", category: "Makeup" },
  { name: "BB Cream", price: 2200, img: "images/bbcream1.jpg", category: "Skincare" },
  { name: "Highlighter Palette", price: 3300, img: "images/highlighter1.jpg", category: "Makeup" },
  { name: "Eyeliner Pen", price: 900, img: "images/eyeliner1.jpg", category: "Makeup" },
  { name: "Mascara", price: 1500, img: "images/mascara1.jpg", category: "Makeup" },
  { name: "Perfume Spray", price: 4500, img: "images/perfume1.jpg", category: "Fragrance" },
  { name: "Face Mask Pack", price: 1300, img: "images/facemask1.jpg", category: "Skincare" },
  { name: "Sunscreen SPF50", price: 2100, img: "images/sunscreen1.jpg", category: "Skincare" },
  { name: "Nail Polish Set", price: 1700, img: "images/nailpolish1.jpg", category: "Makeup" },
  { name: "Compact Mirror", price: 800, img: "images/mirror1.jpg", category: "Accessories" },
  { name: "Hair Conditioner", price: 1800, img: "images/conditioner1.jpg", category: "Haircare" }
];

  function renderProducts(){
    tableBody.innerHTML="";
    products.forEach((p,idx)=>{
      const tr = document.createElement("tr");
      tr.innerHTML=`
        <td>${p.name}</td>
        <td>${p.price}</td>
        <td>${p.category}</td>
        <td><img src="${p.img}" alt="${p.name}" style="width:50px;"></td>
        <td>
          <button data-index="${idx}" class="edit-btn">Edit</button>
          <button data-index="${idx}" class="delete-btn">Delete</button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
    localStorage.setItem("products",JSON.stringify(products));
  }

  renderProducts();

  addBtn.addEventListener("click", ()=>{
    if(!productName.value||!productPrice.value||!productImg.value||!productCategory.value){
      alert("Fill all fields!");
      return;
    }
    products.push({
      name:productName.value,
      price:Number(productPrice.value),
      img:productImg.value,
      category:productCategory.value
    });
    productName.value="";
    productPrice.value="";
    productImg.value="";
    productCategory.value="";
    renderProducts();
    alert("Product added successfully!");
  });

  tableBody.addEventListener("click", e=>{
    const idx = e.target.dataset.index;
    if(e.target.classList.contains("delete-btn")){
      if(confirm("Are you sure you want to delete this product?")){
        products.splice(idx,1);
        renderProducts();
      }
    }
    if(e.target.classList.contains("edit-btn")){
      const p=products[idx];
      const newName=prompt("Edit Name:",p.name);
      const newPrice=prompt("Edit Price:",p.price);
      const newImg=prompt("Edit Image URL:",p.img);
      const newCat=prompt("Edit Category:",p.category);
      if(newName && newPrice && newImg && newCat){
        products[idx]={name:newName,price:Number(newPrice),img:newImg,category:newCat};
        renderProducts();
      }
    }
  });
});
