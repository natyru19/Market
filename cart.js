const body = document.querySelector("body");
const main = document.querySelector(".main");

const renderCart = (prodData)=>{

    prodData.forEach(prod =>{
        const prodContainer = document.createElement("div");
        prodContainer.classList.add("prodContainer");
        
        const prodName = document.createElement("h4");
        prodName.innerText = prod.title;

        const prodQuantity = document.createElement("p");
        prodQuantity.innerText = `Cantidad: ${prod.quantity}`;

        prodContainer.appendChild(prodName);
        prodContainer.appendChild(prodQuantity);
        main.appendChild(prodContainer);
    })
}

const cartSaved = JSON.parse(window.localStorage.getItem("Carrito"));
if(cartSaved){
    console.log("productos en el carrito: ", cartSaved);
    renderCart(cartSaved);
}

const backBtn = document.querySelector(".backBtn");
backBtn.addEventListener("click", () => {
    window.location.href = "/index.html";
})

const deleteCartBtn = document.createElement("button");
deleteCartBtn.innerText = "Borrar carrito";
body.appendChild(deleteCartBtn);
deleteCartBtn.addEventListener("click", () => {    
    //localStorage.removeItem("Carrito");
    //console.log("se borró el carrito");
    localStorage.clear();
    console.log("se borró todo del local storage");
    main.innerHTML = "";
    
})