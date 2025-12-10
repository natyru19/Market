const purchasesMain = document.querySelector(".purchasesMain");
const productPurchased = JSON.parse(localStorage.getItem("infoProducto"));

const purchaseBackBtn = document.createElement("button");
purchaseBackBtn.classList.add("purchaseBackBtn");
purchaseBackBtn.innerText = "Volver";
purchasesMain.appendChild(purchaseBackBtn);

purchaseBackBtn.addEventListener("click", ()=>{
    window.location.href = "/index.html";
});

const renderCardPurchases = (purchaseData) =>{
    const purchaseCard = document.createElement("div");
    purchaseCard.classList.add("purchaseCard");

    const purchaseProdTitle = document.createElement("h3");
    purchaseProdTitle.classList.add("purchaseProdTitle");
    purchaseProdTitle.innerText = purchaseData.title;

    purchaseCard.appendChild(purchaseProdTitle);
    purchasesMain.appendChild(purchaseCard);
}

renderCardPurchases(productPurchased);