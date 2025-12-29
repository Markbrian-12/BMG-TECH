document.addEventListener("DOMContentLoaded", ()=>{
  const form = document.getElementById("checkout-form");
  const summary = document.getElementById("order-summary");

  // Load cart items
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function getTotal(){
    return cart.reduce((acc,item)=>acc + item.price*(item.qty||1),0);
  }

  // Show order summary
  function renderSummary(){
    if(cart.length===0){
      summary.innerHTML="<p>Your cart is empty!</p>";
      return;
    }
    let html = "<h3>Order Summary:</h3><ul>";
    cart.forEach(item=>{
      html += `<li>${item.name} x${item.qty||1} - KES ${item.price*(item.qty||1)}</li>`;
    });
    html += `</ul><p><strong>Total: KES ${getTotal()}</strong></p>`;
    summary.innerHTML = html;
  }

  renderSummary();

  // Handle form submission
  form.addEventListener("submit", e=>{
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const payment = document.getElementById("payment").value;

    if(cart.length===0){
      alert("Your cart is empty!");
      return;
    }
    
    if(payment === "mpesa"){
  const phone = document.getElementById("phone").value;
  const amount = getTotal();

  fetch("http://localhost:3000/api/mpesa/stk", {
    method:"POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, amount })
  })
  .then(res => res.json())
  .then(data => {
    summary.innerHTML = `<p>STK Push sent! Check your phone to complete payment.</p>`;
  });
}
    
    let paymentMsg = "";
    switch(payment){
      case "mpesa":
        paymentMsg = "You will receive an M-PESA payment prompt shortly.";
        break;
      case "paypal":
        paymentMsg = "Redirecting to PayPal...";
        break;
      case "cod":
        paymentMsg = "Your order will be paid on delivery.";
        break;
    }

    summary.innerHTML = `<h3>Thank you ${name}!</h3>
      <p>Your order of ${cart.length} item(s) totaling KES ${getTotal()} has been placed.</p>
      <p>${paymentMsg}</p>
      <p>Delivery Address: ${address}</p>
    `;

    // Clear cart after order
    localStorage.removeItem("cart");
    form.reset();
  });
});
