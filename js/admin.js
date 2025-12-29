document.addEventListener("DOMContentLoaded", ()=>{
  const productName = document.getElementById("product-name");
  const productPrice = document.getElementById("product-price");
  const productImg = document.getElementById("product-img");
  const productCategory = document.getElementById("product-category");
  const addBtn = document.getElementById("add-product-btn");
  const tableBody = document.getElementById("product-table-body");

  // ✅ Pre-populated BMG-TECH Products
  let products = JSON.parse(localStorage.getItem("products")) || [
    { name: "Hair Clippers", price: 2500, img: "https://via.placeholder.com/300x180?text=Hair+Clippers", category: "Haircare" },
    { name: "Cosmetics Kit", price: 1800, img: "https://via.placeholder.com/300x180?text=Cosmetics+Kit", category: "Cosmetics" },
    { name: "Premium Shampoo", price: 900, img: "https://via.placeholder.com/300x180?text=Premium+Shampoo", category: "Haircare" },
    { name: "Hair Dryer", price: 3200, img: "https://via.placeholder.com/300x180?text=Hair+Dryer", category: "Haircare" },
    { name: "Beard Trimmer", price: 2000, img: "https://via.placeholder.com/300x180?text=Beard+Trimmer", category: "Haircare" },
    { name: "Facial Serum", price: 1500, img: "https://via.placeholder.com/300x180?text=Facial+Serum", category: "Cosmetics" },
    { name: "Lipstick Set", price: 1200, img: "https://via.placeholder.com/300x180?text=Lipstick+Set", category: "Cosmetics" },
    { name: "Conditioner", price: 800, img: "https://via.placeholder.com/300x180?text=Conditioner", category: "Haircare" },
    { name: "Makeup Brushes", price: 1800, img: "https://via.placeholder.com/300x180?text=Makeup+Brushes", category: "Cosmetics" },
    { name: "Hair Gel", price: 600, img: "https://via.placeholder.com/300x180?text=Hair+Gel", category: "Haircare" }
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
