const allPurchasesMain = document.querySelector(".allPurchasesMain");

const currentPurchase = JSON.parse(localStorage.getItem("purchaseCurrent"));
const compraDesdeCarrito = JSON.parse(localStorage.getItem("compraCarrito"));
const purchaseHistory = JSON.parse(localStorage.getItem("purchaseHistory"));

//const history = //purchaseHistory

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

    const purchaseId = document.createElement("p");
    purchaseId.classList.add("purchaseId");
    purchaseId.innerText = `Id de la compra: ${data.purchaseId}`;

    const buyerName = document.createElement("p");
    buyerName.classList.add("buyerName");
    buyerName.innerText = `Comprador: ${data.buyerId}`;

    const purchaseDate = document.createElement("p");
    purchaseDate.classList.add("purchaseDate");
    purchaseDate.innerText = `Fecha: ${data.purchaseDate}`;

    const totalQtyPurchase = document.createElement("p");
    totalQtyPurchase.classList.add("totalQtyPurchase");
    totalQtyPurchase.innerText = `Cantidad total de productos: ${data.totalQty}`;    

    const totalAmountPurchase = document.createElement("p");
    totalAmountPurchase.classList.add("totalAmountPurchase");
    totalAmountPurchase.innerText = `Total de las compras: $ ${data.totalAmount}`;

    const moreInfoPurchase = document.createElement("button");
    moreInfoPurchase.classList.add("moreInfoPurchase");
    moreInfoPurchase.innerText = "Ver más info";

    purchaseCard.appendChild(purchaseId);
    purchaseCard.appendChild(buyerName);
    purchaseCard.appendChild(purchaseDate);
    purchaseCard.appendChild(totalQtyPurchase);
    purchaseCard.appendChild(totalAmountPurchase);
    purchaseCard.appendChild(moreInfoPurchase);    
    allPurchasesMain.appendChild(purchaseCard);

    let initialPurchaseId=0;
    let selectedPurchaseId;

    moreInfoPurchase.addEventListener("click", async () =>{        
        selectedPurchaseId = data.purchaseId;

        const productsPurchased = data.products;

        if(selectedPurchaseId != initialPurchaseId){

            productsPurchased.forEach(async (prod) =>{
                const prodId = prod.id;
                const infoById = await getProdTitleByProdId(prodId);
                renderProductsPurchase(prod, infoById);
            })
        }
        initialPurchaseId = selectedPurchaseId;
    })
}

const getProdTitleByProdId = async (prodId) => {
    const urlProdById = `https://dummyjson.com/products/${prodId}`    

    const response = await fetch(urlProdById);
    const responseData = await response.json();   
    return responseData; 
}

const renderProductsPurchase = (moreInfo, infoById) =>{
    const purchaseProdCardMoreInfo = document.createElement("div");
    purchaseProdCardMoreInfo.classList.add("purchaseProdCardMoreInfo");
    purchaseProdCardMoreInfo.dataset.id = moreInfo.id;

    const purchaseProdImgMoreInfo = document.createElement("img");
    purchaseProdImgMoreInfo.classList.add("purchaseProdImgMoreInfo");
    purchaseProdImgMoreInfo.setAttribute("src", infoById.images[0]);

    const purchaseProdIdMoreInfo = document.createElement("p");
    purchaseProdIdMoreInfo.classList.add("purchaseProdIdMoreInfo");
    purchaseProdIdMoreInfo.innerText = `ProdId de la compra: ${moreInfo.id}`;

    const purchaseProdTitleMoreInfo = document.createElement("p");
    purchaseProdTitleMoreInfo.classList.add("purchaseProdTitleMoreInfo");
    purchaseProdTitleMoreInfo.innerText = `Producto: ${infoById.title}`;

    const purchaseProdQtyMoreInfo = document.createElement("p");
    purchaseProdQtyMoreInfo.classList.add("purchaseProdQtyMoreInfo");
    purchaseProdQtyMoreInfo.innerText = `Cantidad: ${moreInfo.qty}`;

    const purchaseProdPriceMoreInfo = document.createElement("p");
    purchaseProdPriceMoreInfo.classList.add("purchaseProdPriceMoreInfo");
    purchaseProdPriceMoreInfo.innerText = `Precio unitario: $ ${moreInfo.unitPrice}`;

    purchaseProdCardMoreInfo.appendChild(purchaseProdImgMoreInfo);
    purchaseProdCardMoreInfo.appendChild(purchaseProdIdMoreInfo);
    purchaseProdCardMoreInfo.appendChild(purchaseProdTitleMoreInfo);
    purchaseProdCardMoreInfo.appendChild(purchaseProdQtyMoreInfo);
    purchaseProdCardMoreInfo.appendChild(purchaseProdPriceMoreInfo);
    allPurchasesMain.appendChild(purchaseProdCardMoreInfo);
}

// if(compraDesdeCarrito){
//     renderCardAllPurchases(compraDesdeCarrito);
// }else if(currentPurchase){
//     renderCardAllPurchases(currentPurchase);
// }
purchaseHistory.forEach(purchase => {
    renderCardAllPurchases(purchase);
})

