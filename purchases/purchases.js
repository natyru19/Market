const purchasesMain = document.querySelector(".purchasesMain");
const productPurchased = JSON.parse(localStorage.getItem("infoProducto"));

const currentPurchase = JSON.parse(localStorage.getItem("purchaseCurrent"));

const purchaseBackBtn = document.createElement("button");
purchaseBackBtn.classList.add("purchaseBackBtn");
purchaseBackBtn.innerText = "Volver";
purchasesMain.appendChild(purchaseBackBtn);

purchaseBackBtn.addEventListener("click", ()=>{
    if(productPurchased==null){
        window.location.href = "/index.html";
    }else{
        window.location.href = "/detail/detail.html";
    }
});

const renderCardPurchases = (purchaseData) =>{

    const purchaseCard = document.createElement("div");
    purchaseCard.classList.add("purchaseCard");
    purchaseCard.dataset.id = purchaseData.id;

    const detailsProductPurchasedContainer = document.createElement("div");
    detailsProductPurchasedContainer.classList.add("detailsProductPurchasedContainer");

    const purchaseProdImg = document.createElement("img");
    purchaseProdImg.classList.add("purchaseProdImg");
    purchaseProdImg.setAttribute("src", "/img/check.png");

    const purchaseProdTitle = document.createElement("h3");
    purchaseProdTitle.classList.add("purchaseProdTitle");
    purchaseProdTitle.innerText = purchaseData.title;

    const purchaseProdQty = document.createElement("p");
    purchaseProdQty.classList.add("purchaseProdQty");
    purchaseProdQty.innerText = `Cantidad: ${purchaseData.qty}`;

    const purchaseProdPrice = document.createElement("p");
    purchaseProdPrice.classList.add("purchaseProdPrice");
    purchaseProdPrice.innerText = `Precio unitario: $ ${purchaseData.price}`;

    const confirmPurchaseContainer = document.createElement("div");
    confirmPurchaseContainer.classList.add("confirmPurchaseContainer");

    const confPurchDateTime = document.createElement("p");
    confPurchDateTime.classList.add("confPurchDateTime");
    confPurchDateTime.innerText = `Fecha: ${purchaseData.date}`;

    const confPurchTotal = document.createElement("p");
    confPurchTotal.classList.add("confPurchTotal");
    let totalPurchase = purchaseData.price * purchaseData.qty;
    totalPurchase = Math.round(totalPurchase * 100) / 100;    
    confPurchTotal.innerText = `Total de la compra: $ ${purchaseData.total}`;

    detailsProductPurchasedContainer.appendChild(purchaseProdImg);
    detailsProductPurchasedContainer.appendChild(purchaseProdTitle);
    detailsProductPurchasedContainer.appendChild(purchaseProdQty);
    detailsProductPurchasedContainer.appendChild(purchaseProdPrice);
    purchaseCard.appendChild(detailsProductPurchasedContainer);
    purchaseCard.appendChild(confirmPurchaseContainer);
    confirmPurchaseContainer.appendChild(confPurchDateTime);
    confirmPurchaseContainer.appendChild(confPurchTotal);
    purchasesMain.appendChild(purchaseCard);    
}

renderCardPurchases(currentPurchase);








