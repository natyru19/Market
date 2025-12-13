const purchasesMain = document.querySelector(".purchasesMain");
const productPurchased = JSON.parse(localStorage.getItem("infoProducto"));
const purchaseConfirm = JSON.parse(localStorage.getItem("purchaseConfirm"));

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

const today = new Date();

const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();

const hours = today.getHours();
const minutes = today.getMinutes();
const seconds = today.getSeconds();

const hoursFormat = hours < 10 ? '0' + hours : hours;
const minutesFormat = minutes < 10 ? '0' + minutes : minutes;
const secondsFormat = seconds < 10 ? '0' + seconds : seconds;

const dateFormat = `${day}/${month}/${year} ${hoursFormat}:${minutesFormat}:${secondsFormat}`;

const confPurchDateTime = document.createElement("p");
confPurchDateTime.classList.add("confPurchDateTime");
confPurchDateTime.innerText = `Fecha: ${dateFormat}`;

const confPurchTotal = document.createElement("p");
confPurchTotal.classList.add("confPurchTotal");

let totalPurchase = purchaseConfirm.price * purchaseConfirm.quantity;
totalPurchase = Math.round(totalPurchase * 100) / 100;    
confPurchTotal.innerText = `Total de la compra: $ ${totalPurchase}`;

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
    purchaseProdQty.innerText = `Cantidad: ${purchaseData.quantity}`;

    const purchaseProdPrice = document.createElement("p");
    purchaseProdPrice.classList.add("purchaseProdPrice");
    purchaseProdPrice.innerText = `Precio unitario: $ ${purchaseData.price}`;

    const confirmPurchaseContainer = document.createElement("div");
    confirmPurchaseContainer.classList.add("confirmPurchaseContainer");

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

const finalPurchase = {
    id: purchaseConfirm.id,
    img: purchaseConfirm.images[0],
    title: purchaseConfirm.title,
    qty: purchaseConfirm.quantity,
    price: purchaseConfirm.price,
    date: dateFormat,
    total: totalPurchase
}

let purchaseSummary = JSON.parse(localStorage.getItem("purchaseSummary")) || [];
purchaseSummary.push(finalPurchase);
localStorage.setItem("purchaseSummary", JSON.stringify(purchaseSummary));

JSON.parse(localStorage.getItem("purchaseSummary"));
renderCardPurchases(purchaseConfirm);








