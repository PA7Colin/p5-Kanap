const start = () => {
    const orderId = document.querySelector("#orderId");
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("orderId");
    orderId.textContent = id;
  };
  
  window.addEventListener("load", start);