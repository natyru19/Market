const body = document.querySelector("body");
const cartMain = document.querySelector(".cartMain");
const cartImg = document.querySelector(".cartImg");

let prodsInCArtLocalStorage = JSON.parse(localStorage.getItem("Carrito"));
let itemCountLocalStorage = localStorage.getItem("cantItemsCarrito");
const productStock = localStorage.getItem("prodStock");

const cartIconContainer = document.querySelector(".cartIconContainer");
let cartItemCount = document.createElement("p");
cartItemCount.classList.add("cartItemCount");
cartIconContainer.appendChild(cartItemCount);

const renderCart = (prodData)=>{    
    const prodContainer = document.createElement("div");
        prodContainer.classList.add("prodContainer");
        prodContainer.dataset.id = prodData.id;

        const prodImg = document.createElement("img");
        prodImg.classList.add("prodImg");
        prodImg.setAttribute("src", "/img/pending.png");
        
        const prodName = document.createElement("h4");
        prodName.innerText = prodData.title;

        const prodQuantity = document.createElement("p");
        prodQuantity.innerText = `Cantidad: ${prodData.quantity}`;

        const deleteProdBtn = document.createElement("img");
        deleteProdBtn.classList.add("deleteProdBtn");
        deleteProdBtn.setAttribute("src", "/img/delete.png") 

        prodContainer.appendChild(prodImg);
        prodContainer.appendChild(prodName);
        prodContainer.appendChild(prodQuantity);
        prodContainer.appendChild(deleteProdBtn);
        cartMain.appendChild(prodContainer);

        deleteProdBtn.addEventListener("click", ()=>{
            messageProdDelete(prodData);
        });
}

const messageProdDelete = (prodData)=>{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Estás seguro?",
        text: `Querés eliminar el producto ${prodData.title}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, elimínalo!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
                title: "Eliminado!",
                text: `El producto ${prodData.title} fue eliminado`,
                icon: "success"
                });

                let updatedProdArray = [];
                cartSaved.map(product =>{
                    if(product.id != prodData.id){
                        updatedProdArray.push(product);
                    }
                    cartSaved = updatedProdArray;                    
                    localStorage.setItem("Carrito", JSON.stringify(cartSaved));
                    cartMain.innerHTML = "";
                    renderCart(cartSaved);
                })                
                itemCountLocalStorage = itemCountLocalStorage - prodData.quantity;                                   
                localStorage.setItem("cantItemsCarrito", itemCountLocalStorage);
                cartItemCount.innerText = itemCountLocalStorage;
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelado",
                text: `Se canceló antes de eliminar el producto ${prodData.title}`,
                icon: "error"
            });
        }
    });
}

if(prodsInCArtLocalStorage){
    prodsInCArtLocalStorage.forEach(prod =>{
        renderCart(prod);
    })
}

if(prodsInCArtLocalStorage){    
    cartItemCount.innerText = itemCountLocalStorage;
}

const backBtn = document.querySelector(".backBtn");
backBtn.addEventListener("click", () => {
    window.location.href = "/index.html";
})

const deleteCartBtn = document.createElement("button");
deleteCartBtn.innerText = "Borrar carrito";
cartMain.appendChild(deleteCartBtn);

deleteCartBtn.addEventListener("click", () => {
        messageToConfirmCartDelete();
})

const cartBuyBtn = document.createElement("button");
cartBuyBtn.classList.add("cartBuyBtn");
cartBuyBtn.innerText = "Comprar";
cartMain.appendChild(cartBuyBtn);

cartBuyBtn.addEventListener("click", ()=>{
    messageToConfirmPurchase();
})

const messageToConfirmCartDelete = () =>{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Estás seguro?",
        text: `Querés eliminar todo el carrito?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, elimínalo!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
                title: "Eliminado!",
                text: `Se eliminó el carrito`,
                icon: "success"
                });

                localStorage.clear();
                cartMain.innerHTML = "";    
                cartItemCount.innerHTML = "";
                window.location.href = "/index.html";
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelado",
                text: `Se canceló antes de eliminar el carrito`,
                icon: "error"
            });
        }
    });
}

const messageToConfirmPurchase = () =>{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Estás seguro?",
        text: `Querés realizar la compra?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, comprar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
                title: "Comprado!",
                text: `Se compró el carrito`,
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

            let totalPurchase = prodsInCArtLocalStorage.price * prodsInCArtLocalStorage.quantity;
            totalPurchase = Math.round(totalPurchase * 100) / 100;    
            confPurchTotal.innerText = `Total de la compra: $ ${totalPurchase}`;

            const lastPurchaseIdInLocalStorage = JSON.parse(localStorage.getItem("lastPurchaseId"));

            let lastPurchaseId;
            if(prodsInCArtLocalStorage){ 
                if(lastPurchaseIdInLocalStorage==null){
                    lastPurchaseId = 1;
                }else{
                    lastPurchaseId = lastPurchaseIdInLocalStorage + 1;                    
                }
                let buyerName = prompt("Ingrese su nombre");                
                const products = prodsInCArtLocalStorage.map(prod =>{
                    return {
                        id: prod.id,
                        qty: prod.quantity,
                        unitPrice: prod.price
                    }
                })

                let totalAmount = 0;
                let totalQty = 0;

                products.forEach(prod =>{
                    totalAmount += prod.qty * prod.unitPrice;
                    totalAmount = Math.round(totalAmount * 100) / 100;
                })

                products.forEach(prod =>{
                    totalQty += prod.qty;
                })

                const finalPurchase = {
                    purchaseId: lastPurchaseId,
                    buyerId: buyerName,
                    products: products,
                    purchaseDate: dateFormat,
                    totalQty: totalQty,
                    totalAmount: totalAmount
                }

                lastPurchaseId = finalPurchase.purchaseId;

                localStorage.setItem("compraCarrito", JSON.stringify(finalPurchase));

                localStorage.setItem("purchaseCurrent", JSON.stringify(finalPurchase));
                
                localStorage.setItem("lastPurchaseId", JSON.stringify(lastPurchaseId));
            }
            
            cartMain.innerHTML = "";    
            cartItemCount.innerHTML = "";
            window.location.href = "/purchases/purchases.html";
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelado",
                text: `Se canceló antes de comprar el carrito`,
                icon: "error"
            });
        }
    });
}