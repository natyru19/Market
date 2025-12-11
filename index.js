const purchasesImg = document.querySelector(".purchasesImg");
const cartImg = document.querySelector(".cartImg");
const searchInput = document.getElementById("searchInput");
const searchImg = document.querySelector(".searchImg");
const main = document.getElementById("cardsContainer");

const cartIconContainer = document.querySelector(".cartIconContainer");
let cartItemCount = document.createElement("p");
cartItemCount.classList.add("cartItemCount");
cartIconContainer.appendChild(cartItemCount);

let addedToCart;
const prodsInCArtLocalStorage = JSON.parse(localStorage.getItem("Carrito"));
const productStock = localStorage.getItem("prodStock");

purchasesImg.addEventListener("click", ()=>{
    window.location.href = "/purchases/purchases.html";
})

searchInput.addEventListener("keydown", (e)=>{
    if(e.key == "Enter"){
        textValue();
    }
});

searchImg.addEventListener("click", ()=>{
    textValue();
})

const textValue = () =>{
    const productSearched = searchInput.value;    
    return productSearched;
}

const renderProductCard = (productData) => {

    const productCard = document.createElement("div");
    productCard.classList.add("productCard");
    productCard.dataset.id = productData.id;

    const prodImg = document.createElement("img");
    prodImg.classList.add("prodImg");
    prodImg.setAttribute("src", productData.images[0]);

    const prodTitle = document.createElement("h3");
    prodTitle.classList.add("prodTitle");
    prodTitle.innerText = productData.title;

    const prodPrice = document.createElement("p");
    prodPrice.classList.add("prodPrice");
    prodPrice.innerText = `$ ${productData.price}`;

    const prodAddToCartBtn = document.createElement("button");
    prodAddToCartBtn.classList.add("prodAddToCartBtn");
    prodAddToCartBtn.innerText = "Agregar al carrito";
    
    productCard.appendChild(prodImg);
    productCard.appendChild(prodTitle);
    productCard.appendChild(prodPrice);
    productCard.appendChild(prodAddToCartBtn);
    main.appendChild(productCard);
    
    productCard.addEventListener("click", ()=>{
        productData = {...productData, quantity: 1}
        localStorage.setItem("infoProducto", JSON.stringify(productData));        
        window.location.href = "/detail/detail.html";
    })

    prodAddToCartBtn.addEventListener("click", (e)=>{
        e.stopPropagation();
        let prodsInCart = JSON.parse(window.localStorage.getItem("Carrito"))|| [];
        const existingProduct = prodsInCart.find(prod=>prod.id===productData.id)

        if(existingProduct){
            existingProduct.quantity+=1;
            messageAddedToCart(existingProduct.title);
        }else{
            const newProdWithQty = {...productData, quantity: 1};
            prodsInCart.push(newProdWithQty)
            messageAddedToCart(newProdWithQty.title);
        }

        localStorage.setItem("Carrito", JSON.stringify(prodsInCart));
        let ItemCountValue = 0;  
        prodsInCart.forEach(prod=>{
            ItemCountValue += prod.quantity
        })
        cartItemCount.innerText = ItemCountValue;
        localStorage.setItem("cantItemsCarrito", ItemCountValue);
    })
}

if(prodsInCArtLocalStorage){
    const itemCountLocalStorage =window.localStorage.getItem("cantItemsCarrito");
    cartItemCount.innerText = itemCountLocalStorage;
}

cartImg.addEventListener("click", () =>{
    window.location.href = "/cart/cart.html";
})

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

const getProducts = async () => {
    const url = `https://dummyjson.com/products`;
    
    const response = await fetch(url);
    const responseData = await response.json();
    
    return responseData;
}

const init = async () => {
    const data = await getProducts();
    const products = data.products;
    
    products.forEach( prod => {
        renderProductCard(prod);
    })
}

init();
