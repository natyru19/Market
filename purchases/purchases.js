const purchasesMain = document.querySelector(".purchasesMain");
const productPurchased = JSON.parse(localStorage.getItem("infoProducto"));
const purchaseConfirm = JSON.parse(localStorage.getItem("purchaseConfirm"));
console.log(purchaseConfirm);


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


const renderCardPurchases = (purchaseData) =>{

    const purchaseCard = document.createElement("div");
    purchaseCard.classList.add("purchaseCard");
    purchaseCard.dataset.id = purchaseData.id;

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

    const confPurchDateTime = document.createElement("p");
    confPurchDateTime.classList.add("confPurchDateTime");
    confPurchDateTime.innerText = `Fecha: ${dateFormat}`;

    const confPurchTotal = document.createElement("p");
    confPurchTotal.classList.add("confPurchTotal");

    let totalPurchase = purchaseData.price * purchaseData.quantity;
    totalPurchase = Math.round(totalPurchase * 100) / 100;    
    confPurchTotal.innerText = `Total de la compra: $ ${totalPurchase}`;

    purchaseCard.appendChild(purchaseProdImg);
    purchaseCard.appendChild(purchaseProdTitle);
    purchaseCard.appendChild(purchaseProdQty);
    purchaseCard.appendChild(purchaseProdPrice);
    purchasesMain.appendChild(purchaseCard);

    confirmPurchaseContainer.appendChild(confPurchDateTime);
    confirmPurchaseContainer.appendChild(confPurchTotal);
    purchasesMain.appendChild(confirmPurchaseContainer);
}

renderCardPurchases(purchaseConfirm);

