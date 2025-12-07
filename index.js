const cartImg = document.querySelector(".cartImg");
const searchInput = document.getElementById("searchInput");
const searchImg = document.querySelector(".searchImg");
const main = document.getElementById("cardsContainer");

const cartIconContainer = document.querySelector(".cartIconContainer");
let cartItemCount = document.createElement("p");
cartItemCount.classList.add("cartItemCount");
cartIconContainer.appendChild(cartItemCount);

let addedToCart;
const prodsInCArtLocalStorage = JSON.parse(window.localStorage.getItem("Carrito"));

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

const renderCard = (productData) => {
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
    
    //let ItemCountValue = 0;    

    prodAddToCartBtn.addEventListener("click", ()=>{
        let prodsInCart = JSON.parse(window.localStorage.getItem("Carrito")) || [];
        //recorrer prodsInCart (que es lo miosmo que esta en LS)
            //por cada prod en prodsInCart Pregunto:
                //El id === al id de lo que estoy agregando? (productData)
                    //{...productData, quantity : prod.quantity+1}
                //El id NO ES IGUAL ASI QUE EL PROD NO ESTABA ACA AGREGO:

        const newProdWithQty = {...productData, quantity: 1};
        
        prodsInCart.push(newProdWithQty);

        ItemCountValue = prodsInCart.length;
        cartItemCount.innerText = ItemCountValue;
        localStorage.setItem("cantItemsCarrito", ItemCountValue);
        window.localStorage.setItem("Carrito", JSON.stringify(prodsInCart));
        return prodsInCart;    
    })
}


if(prodsInCArtLocalStorage){
    const itemCountLocalStorage = JSON.parse(window.localStorage.getItem("cantItemsCarrito"));
    cartItemCount.innerText = itemCountLocalStorage;
}

cartImg.addEventListener("click", () =>{
    window.location.href = "/cart.html";
})

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
        renderCard(prod);
    })
}

init();