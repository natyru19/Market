const allPurchasesMain = document.querySelector(".allPurchasesMain");

const history = JSON.parse(localStorage.getItem("purchaseHistory")) || [];

const allPurchaseBackBtn = document.createElement("button");
allPurchaseBackBtn.classList.add("allPurchaseBackBtn");
allPurchaseBackBtn.innerText = "Volver";
allPurchasesMain.appendChild(allPurchaseBackBtn);

allPurchaseBackBtn.addEventListener("click", ()=>{    
    window.location.href = "/index.html";
});

const renderCardAllPurchases = (data) =>{
    const purchaseCard = document.createElement("div");
    purchaseCard.classList.add("purchaseCard");
    purchaseCard.dataset.id = data.id;

    const detailsProductPurchasedContainer = document.createElement("div");
    detailsProductPurchasedContainer.classList.add("detailsProductPurchasedContainer");

    const purchaseProdImg = document.createElement("img");
    purchaseProdImg.classList.add("purchaseProdImg");
    purchaseProdImg.setAttribute("src", data.img);

    const purchaseProdTitle = document.createElement("h3");
    purchaseProdTitle.classList.add("purchaseProdTitle");
    purchaseProdTitle.innerText = data.title;

    const purchaseProdQty = document.createElement("p");
    purchaseProdQty.classList.add("purchaseProdQty");
    purchaseProdQty.innerText = `Cantidad: ${data.qty}`;

    const purchaseProdPrice = document.createElement("p");
    purchaseProdPrice.classList.add("purchaseProdPrice");
    purchaseProdPrice.innerText = `Precio unitario: $ ${data.price}`;

    const confirmPurchaseContainer = document.createElement("div");
    confirmPurchaseContainer.classList.add("confirmPurchaseContainer");

    const confPurchDateTime = document.createElement("p");
    confPurchDateTime.classList.add("confPurchDateTime");
    confPurchDateTime.innerText = `Fecha: ${data.date}`;

    const confPurchTotal = document.createElement("p");
    confPurchTotal.classList.add("confPurchTotal");
    confPurchTotal.innerText = `Total de la compra: $ ${data.total}`;

    detailsProductPurchasedContainer.appendChild(purchaseProdImg);
    detailsProductPurchasedContainer.appendChild(purchaseProdTitle);
    detailsProductPurchasedContainer.appendChild(purchaseProdQty);
    detailsProductPurchasedContainer.appendChild(purchaseProdPrice);
    purchaseCard.appendChild(detailsProductPurchasedContainer);
    purchaseCard.appendChild(confirmPurchaseContainer);
    confirmPurchaseContainer.appendChild(confPurchDateTime);
    confirmPurchaseContainer.appendChild(confPurchTotal);
    allPurchasesMain.appendChild(purchaseCard);
}

history.forEach(purchase =>{
    renderCardAllPurchases(purchase);
})
