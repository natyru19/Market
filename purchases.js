const purchasesMain = document.querySelector(".purchasesMain");

const productPurchased = JSON.stringify(localStorage.getItem("infoProducto"));

const purchaseBackBtn = document.createElement("button");
purchaseBackBtn.classList.add("purchaseBackBtn");
purchaseBackBtn.innerText = "Volver";
purchasesMain.appendChild(purchaseBackBtn);

purchaseBackBtn.addEventListener("click", ()=>{
    window.location.href = "/index.html";
});