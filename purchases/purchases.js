const purchasesMain = document.querySelector(".purchasesMain");
const productPurchased = JSON.parse(localStorage.getItem("infoProducto"));

const currentPurchase = JSON.parse(localStorage.getItem("purchaseCurrent"));
const compraDesdeCarrito = JSON.parse(localStorage.getItem("compraCarrito"));

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

const goToAllPurchasesBtn = document.createElement("button");
goToAllPurchasesBtn.classList.add("goToAllPurchasesBtn");
goToAllPurchasesBtn.innerText = "Ir a todas las compras";
purchasesMain.appendChild(goToAllPurchasesBtn);

goToAllPurchasesBtn.addEventListener("click", ()=>{    
    window.location.href = "/allPurchases/allPurchases.html";
});

const renderCardPurchases = (purchaseData) =>{
    const purchaseCard = document.createElement("div");
    purchaseCard.classList.add("purchaseCard");
    purchaseCard.dataset.id = purchaseData.id;

    const purchaseId = document.createElement("p");
    purchaseId.classList.add("purchaseId");
    purchaseId.innerText = `Id de la compra: ${purchaseData.purchaseId}`;

    const buyerName = document.createElement("p");
    buyerName.classList.add("buyerName");
    buyerName.innerText = `Comprador: ${purchaseData.buyerId}`;
    
    const purchaseDate = document.createElement("p");
    purchaseDate.classList.add("purchaseDate");
    purchaseDate.innerText = `Fecha: ${purchaseData.purchaseDate}`;

    const totalQtyPurchase = document.createElement("p");
    totalQtyPurchase.classList.add("totalQtyPurchase");
    totalQtyPurchase.innerText = `Cantidad total de productos: ${purchaseData.totalQty}`

    const totalAmountPurchase = document.createElement("p");
    totalAmountPurchase.classList.add("totalAmountPurchase");
    totalAmountPurchase.innerText = `Total de la compra: $ ${purchaseData.totalAmount}`;

    const moreInfoPurchase = document.createElement("button");
    moreInfoPurchase.classList.add("moreInfoPurchase");
    moreInfoPurchase.innerText = "Ver más info";

    purchaseCard.appendChild(purchaseId);
    purchaseCard.appendChild(buyerName);
    purchaseCard.appendChild(purchaseDate);
    purchaseCard.appendChild(totalQtyPurchase);
    purchaseCard.appendChild(totalAmountPurchase);
    purchaseCard.appendChild(moreInfoPurchase);
    purchasesMain.appendChild(purchaseCard);
    
    let initialPurchaseId=0;
    let selectedPurchaseId;

    moreInfoPurchase.addEventListener("click", async () =>{        
        selectedPurchaseId = purchaseData.purchaseId;

        const productsPurchased = purchaseData.products;

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
    purchasesMain.appendChild(purchaseProdCardMoreInfo);
}

if(compraDesdeCarrito){
    renderCardPurchases(compraDesdeCarrito);
}else if(currentPurchase){
    renderCardPurchases(currentPurchase);
}








