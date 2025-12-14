
const detailMain = document.querySelector(".detailMain");
const cartImg = document.querySelector(".cartImg");

const cartIconContainer = document.querySelector(".cartIconContainer");
let cartItemCount = document.createElement("p");
cartItemCount.classList.add("cartItemCount");
cartIconContainer.appendChild(cartItemCount);

let productSelected = JSON.parse(localStorage.getItem("infoProducto"));
let prodsInCArtLocalStorage = JSON.parse(localStorage.getItem("Carrito")) || [];

const detailBackBtn = document.createElement("button");
detailBackBtn.classList.add("detailBackBtn");
detailBackBtn.innerText = "Volver";
detailMain.appendChild(detailBackBtn);

detailBackBtn.addEventListener("click", ()=>{
    window.location.href = "/index.html";
});

const renderDetailCard = (productData)=>{
    const detailCard = document.createElement("div");
    detailCard.classList.add("detailCard");
    detailCard.dataset.id = productData.id;

    const detailImg = document.createElement("img");
    detailImg.classList.add("detailImg");
    detailImg.setAttribute("src", productData.images[0]);

    const detailProdTitle = document.createElement("h3");
    detailProdTitle.classList.add("detailProdTitle");
    detailProdTitle.innerText = productData.title;

    const detailPrice = document.createElement("p");
    detailPrice.classList.add("detailPrice");
    detailPrice.innerText = `$ ${productData.price}`;

    const detailDesc = document.createElement("p");
    detailDesc.classList.add("detailDesc");
    detailDesc.innerText = `Descripción: ${productData.description}`;

    const detailCat = document.createElement("p");
    detailCat.classList.add("detailCat");
    detailCat.innerText = `Categoría: ${productData.category}`;

    const detailStock = document.createElement("p");
    detailStock.classList.add("detailStock");
    detailStock.innerText = `Stock: ${productData.stock}`;

    const detailQtyContainer = document.createElement("div");
    detailQtyContainer.classList.add("detailQtyContainer");

    const detailMinQtyBtn = document.createElement("button");
    detailMinQtyBtn.classList.add("detailMinQtyBtn");
    detailMinQtyBtn.innerText = "-";

    const detailSelectedQty = document.createElement("p");
    detailSelectedQty.classList.add("detailSelectedQty");
    detailSelectedQty.innerText = productData.quantity;

    const detailMaxQtyBtn = document.createElement("button");
    detailMaxQtyBtn.classList.add("detailMaxQtyBtn");
    detailMaxQtyBtn.innerText = "+";

    const detailBtnContainer = document.createElement("div");
    detailBtnContainer.classList.add("detailBtnContainer");

    const detailBuyBtn = document.createElement("button");
    detailBuyBtn.classList.add("detailBuyBtn");
    detailBuyBtn.innerText = "Comprar";

    const detailAddToCartBtn = document.createElement("button");
    detailAddToCartBtn.classList.add("detailAddToCartBtn");
    detailAddToCartBtn.innerText = "Agregar al carrito";

    detailCard.appendChild(detailImg);
    detailCard.appendChild(detailProdTitle);
    detailCard.appendChild(detailPrice);
    detailCard.appendChild(detailDesc);
    detailCard.appendChild(detailCat);
    detailCard.appendChild(detailStock);
    detailQtyContainer.appendChild(detailMinQtyBtn);
    detailQtyContainer.appendChild(detailSelectedQty);
    detailQtyContainer.appendChild(detailMaxQtyBtn);
    detailCard.appendChild(detailQtyContainer);
    detailCard.appendChild(detailBtnContainer);
    detailBtnContainer.appendChild(detailBuyBtn);
    detailBtnContainer.appendChild(detailAddToCartBtn);
    detailMain.appendChild(detailCard);
    
    let qty = productData.quantity;

    detailMinQtyBtn.addEventListener("click", () =>{
        if(productData.quantity>1){
            qty = qty-1;
            productData.quantity = qty;
            detailSelectedQty.innerText = productData.quantity;
            qty=productData.quantity;
        }        
    });

    detailMaxQtyBtn.addEventListener("click", () =>{
        qty = qty+1;
        productData.quantity = qty;
        detailSelectedQty.innerText = productData.quantity;
        qty=productData.quantity;        
    });

    detailAddToCartBtn.addEventListener("click", ()=>{
        let prodsInCart = JSON.parse(localStorage.getItem("Carrito"))|| [];
        
        const existingProduct = prodsInCart.find(prod=>prod.id===productData.id)

        if(existingProduct){
            existingProduct.quantity+=qty;            
            messageAddedToCart(existingProduct.title);
        }else{
            
            const newProdWithQty = productData;            
            prodsInCart.push(newProdWithQty);            
            messageAddedToCart(newProdWithQty.title);
        }

        localStorage.setItem("Carrito", JSON.stringify(prodsInCart));
        let ItemCountValue = 0;  
        prodsInCart.forEach(prod=>{
            ItemCountValue += prod.quantity;
        })
        cartItemCount.innerText = ItemCountValue;
        localStorage.setItem("cantItemsCarrito", ItemCountValue);     
    })

    detailBuyBtn.addEventListener("click", ()=>{
        messageToConfirmPurchase(productData.title);
    })
}

renderDetailCard(productSelected);

const messageAddedToCart = (name)=>{
    const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: false,
        didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: "success",
        title: `Se agregó ${name} al carrito`
    });
}

const messageToConfirmPurchase = (name) =>{
    Swal.fire({
        title: "Estás seguro?",
        text: `Quieres realizar la compra de ${name}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, lo quiero!"
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
            title: "Comprado!",
            text: `Se compró el producto ${name}`,
            icon: "success"
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

        let totalPurchase = productSelected.price * productSelected.quantity;
        totalPurchase = Math.round(totalPurchase * 100) / 100;    
        confPurchTotal.innerText = `Total de la compra: $ ${totalPurchase}`;

        console.log("prods en carrito", prodsInCArtLocalStorage)
        if(prodsInCArtLocalStorage==null){
            
            
            const lastPurchaseId = 0;
            let buyerName = prompt("Ingrese su nombre");
            let products = prodsInCArtLocalStorage.map(product =>{
                product.id,
                product.quantity,
                product.unitPrice
            })

            const finalPurchase = {
            purchaseId: lastPurchaseId+1,
            buyerId: buyerName,
            products: products,
            purchaseDate: dateFormat,
            totalAmount: totalPurchase
        }

        localStorage.setItem("Carrito", JSON.stringify(finalPurchase));


        localStorage.setItem("purchaseCurrent", JSON.stringify(finalPurchase));
        console.log(finalPurchase);
        
        localStorage.setItem("lastPurchaseId", JSON.stringify(lastPurchaseId));
        console.log("ultimo id de compra", lastPurchaseId);
        }

        prodsInCArtLocalStorage = JSON.parse(localStorage.getItem("Carrito"));

        let history = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
        history.push(finalPurchase);
        localStorage.setItem("purchaseHistory", JSON.stringify(history));            
        window.location.href = "/purchases/purchases.html";
        }
    });
}

if(prodsInCArtLocalStorage){
    const itemCountLocalStorage =window.localStorage.getItem("cantItemsCarrito");
    cartItemCount.innerText = itemCountLocalStorage;
}

cartImg.addEventListener("click", () =>{
    window.location.href = "/cart/cart.html";
})




