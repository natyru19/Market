const body = document.querySelector("body");
const cartMain = document.querySelector(".cartMain");
const cartImg = document.querySelector(".cartImg");

let cartSaved = JSON.parse(localStorage.getItem("Carrito"));
const prodsInCArtLocalStorage = JSON.parse(localStorage.getItem("Carrito"));
let itemCountLocalStorage = localStorage.getItem("cantItemsCarrito");
const productStock = localStorage.getItem("prodStock");

const cartIconContainer = document.querySelector(".cartIconContainer");
let cartItemCount = document.createElement("p");
cartItemCount.classList.add("cartItemCount");
cartIconContainer.appendChild(cartItemCount);

const renderCart = (prodData)=>{    
    prodData.forEach(prod =>{
        const prodContainer = document.createElement("div");
        prodContainer.classList.add("prodContainer");
        prodContainer.dataset.id = prod.id;

        const prodImg = document.createElement("img");
        prodImg.classList.add("prodImg");
        prodImg.setAttribute("src", "/img/pending.png");
        
        const prodName = document.createElement("h4");
        prodName.innerText = prod.title;

        const prodQuantity = document.createElement("p");
        prodQuantity.innerText = `Cantidad: ${prod.quantity}`;

        const deleteProdBtn = document.createElement("img");
        deleteProdBtn.classList.add("deleteProdBtn");
        deleteProdBtn.setAttribute("src", "/img/delete.png") 

        prodContainer.appendChild(prodImg);
        prodContainer.appendChild(prodName);
        prodContainer.appendChild(prodQuantity);
        prodContainer.appendChild(deleteProdBtn);
        cartMain.appendChild(prodContainer);

        deleteProdBtn.addEventListener("click", ()=>{
            messageProdDelete(prod);
        });
    })
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

if(cartSaved){
    renderCart(cartSaved);
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
    //localStorage.setItem("prodStock");
    //console.log("aca esta la cantidad que hay en LS", productStock);
    //window.location.href = "/purchases/purchases.html";
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
                allPurchasesMain.innerHTML = "";
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

                localStorage.clear();
                cartMain.innerHTML = "";    
                cartItemCount.innerHTML = "";
                window.location.href = "/index.html";
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