// CATEGORY FILTER
const categoryButtons = document.querySelectorAll(".category-btn");
categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const category = btn.getAttribute("data-category");

    document.querySelectorAll(".products .product").forEach(product => {
      if (category === "all" || product.getAttribute("data-category") === category) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  });
});
