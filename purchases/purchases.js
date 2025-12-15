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

const renderCardPurchases = (purchaseData) =>{
    const purchaseCard = document.createElement("div");
    purchaseCard.classList.add("purchaseCard");
    purchaseCard.dataset.id = purchaseData.id;

    const purchaseId = document.createElement("p");
    purchaseId.classList.add("purchaseId");
    purchaseId.innerText = `CompraId: ${purchaseData.purchaseId}`;

    const buyerName = document.createElement("p");
    buyerName.classList.add("buyerName");
    buyerName.innerText = `Comprador: ${purchaseData.buyerId}`;
    
    const purchaseDate = document.createElement("p");
    purchaseDate.classList.add("purchaseDate");
    purchaseDate.innerText = `Fecha: ${purchaseData.purchaseDate}`;

    const totalAmountPurchase = document.createElement("p");
    totalAmountPurchase.classList.add("totalAmountPurchase");
    totalAmountPurchase.innerText = `Total de la compra: $ ${purchaseData.totalAmount}`;

    const moreInfoPurchase = document.createElement("button");
    moreInfoPurchase.classList.add("moreInfoPurchase");
    moreInfoPurchase.innerText = "Ver más info";

    purchaseCard.appendChild(purchaseId);
    purchaseCard.appendChild(buyerName);
    purchaseCard.appendChild(purchaseDate);
    purchaseCard.appendChild(totalAmountPurchase);
    purchaseCard.appendChild(moreInfoPurchase);
    purchasesMain.appendChild(purchaseCard);
    
    moreInfoPurchase.addEventListener("click", () =>{
        const productsPurchased = purchaseData.products;
        
        productsPurchased.forEach(async (prod) =>{
            const prodId = prod.id;
            const infoById = await getProdTitleByProdId(prodId);
            renderProductsPurchase(prod, infoById);
        })
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

/*
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

    const moreInfoPurchase = document.createElement("button");
    moreInfoPurchase.classList.add("moreInfoPurchase");
    moreInfoPurchase.innerText = "Ver más info";

    detailsProductPurchasedContainer.appendChild(purchaseProdImg);
    detailsProductPurchasedContainer.appendChild(purchaseProdTitle);
    detailsProductPurchasedContainer.appendChild(purchaseProdQty);
    detailsProductPurchasedContainer.appendChild(purchaseProdPrice);
    purchaseCard.appendChild(detailsProductPurchasedContainer);
    purchaseCard.appendChild(confirmPurchaseContainer);
    purchaseCard.appendChild(moreInfoPurchase);
    confirmPurchaseContainer.appendChild(confPurchDateTime);
    confirmPurchaseContainer.appendChild(confPurchTotal);
    purchasesMain.appendChild(purchaseCard);
    
    moreInfoPurchase.addEventListener("click", () =>{
        console.log("aca muestro mas información de la compra");
        
    })
}*/








