
const detailMain = document.querySelector(".detailMain");
const cartImg = document.querySelector(".cartImg");

const cartIconContainer = document.querySelector(".cartIconContainer");
let cartItemCount = document.createElement("p");
cartItemCount.classList.add("cartItemCount");
cartIconContainer.appendChild(cartItemCount);

const productSelected = JSON.parse(localStorage.getItem("infoProducto"));
const prodsInCArtLocalStorage = JSON.parse(localStorage.getItem("Carrito"));

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
    detailCard.appendChild(detailBtnContainer);
    detailBtnContainer.appendChild(detailBuyBtn);
    detailBtnContainer.appendChild(detailAddToCartBtn);
    detailMain.appendChild(detailCard);

    detailAddToCartBtn.addEventListener("click", ()=>{
        let prodsInCart = JSON.parse(localStorage.getItem("Carrito"))|| [];
        
        const existingProduct = prodsInCart.find(prod=>prod.id===productData.id)

        if(existingProduct){
            existingProduct.quantity+=1;            
            messageAddedToCart(existingProduct.title);
        }else{
            const newProdWithQty = {...productData, quantity: 1};            
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
        window.location.href = "/purchases.html";
    })
}

const messageAddedToCart = (name)=>{
    Swal.fire({
    position: "top-end",
    icon: "success",
    title: `Se agregó ${name} al carrito`,
    showConfirmButton: false,
    timer: 1500
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
            window.location.href = "/purchases.html";
        }
    });
}

if(prodsInCArtLocalStorage){
    const itemCountLocalStorage =window.localStorage.getItem("cantItemsCarrito");
    cartItemCount.innerText = itemCountLocalStorage;
}

cartImg.addEventListener("click", () =>{
    window.location.href = "/cart.html";
})

const detailBackBtn = document.createElement("button");
detailBackBtn.classList.add("detailBackBtn");
detailBackBtn.innerText = "Volver";
detailMain.appendChild(detailBackBtn);

detailBackBtn.addEventListener("click", ()=>{
    window.location.href = "/index.html";
});

renderDetailCard(productSelected);





