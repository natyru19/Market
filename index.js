const main = document.getElementById("cardsContainer");

const renderCard = (productData) => {
    const productCard = document.createElement("div");
    productCard.classList.add("productCard");

    const prodImg = document.createElement("img");
    prodImg.classList.add("prodImg");
    prodImg.setAttribute("src", productData.images);

    const prodTitle = document.createElement("p");
    prodTitle.classList.add("prodTitle");
    prodTitle.innerTex = productData.title;

    const prodPrice = document.createElement("p");
    prodPrice.classList.add("prodPrice");
    prodPrice.innerText = `$ ${productData.price}`;

    const prodButton = document.createElement("button");
    prodButton.classList.add("prodButton");
    prodButton.innerText = "Agregar al carrito";

    productCard.appendChild(prodImg);
    productCard.appendChild(prodTitle);
    productCard.appendChild(prodPrice);
    productCard.appendChild(prodButton);
    main.appendChild(productCard);
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
        renderCard(prod);
    })
}

init();