
let produitId = new URL(location.href).searchParams.get("id");

// Le fichier .json est traité,
fetch("http://localhost:3000/api/products/" + produitId )  
.then((response) => {
  if(response.ok) {
    response.json()
    .then((value) => {
      KanapDisplay(value);
    })
  } else {
    console.error('Erreur');
  }
})
.catch((error) => {
  console.error("Erreur fetch" + error);
});
      
// On affiche les produits dynamiquement 
const KanapDisplay = (produit) => {  
  let colorsKanap = produit.colors;
  Kanapname = produit.name;
  document.querySelector(".item__img").innerHTML = `<img src="${produit.imageUrl}" alt="${produit.altTxt}">`;
  document.querySelector("#title").innerHTML = `<h1> ${produit.name} </h1>`;
  document.querySelector("#price").innerHTML = ` <span id="price">${produit.price}</span>`;
  document.querySelector("#description").innerHTML = `<p id="description">${produit.description}</p>`;
  
  // Boucle qui parcous les couleurs (i in colorsKanap)
  for (let i in colorsKanap)  {
    document.querySelector("#colors").innerHTML += `
    <option value="${colorsKanap[i]}">${colorsKanap[i]}</option> `;
  }
};

// Evenement sur le click + Local Storage

const button = document.querySelector("#addToCart")
button.addEventListener("click", () => {
  let color = document.querySelector("#colors").value;
  let quantity = document.querySelector("#quantity").value;
  let titleName = Kanapname ;
  
  if (color === "" || quantity <= 0 || quantity > 100) {
    alert("Choisissez une couleur et une quantité ! ")
    return
  }
 
  let productOption = {
    id : produitId ,
    color : color ,
    quantity : parseInt(quantity) ,
    title : titleName
  };
    
  let productInlocalStorage = JSON.parse(localStorage.getItem("panier"));
  
  // Si il y a deja des produits dand le panier 
  if (productInlocalStorage == null) {

    productInlocalStorage = [];
  }

//  Si produit trouvé, on vérifie que le produit et sa couleur ne sont pas déja stockés dans le LS // 
//  Si produit trouvé , on ajoute juste la quantité // 
const foundProduct = productInlocalStorage.find((product) => { 
  return product.color === color && product.id === produitId
})

if(foundProduct)
{
  foundProduct.quantity +=parseInt(quantity)
  console.log(quantity);
}

//On stocke les datas dans le local storage
else 
{  
  productInlocalStorage.push(productOption)
}
localStorage.setItem("panier",JSON.stringify(productInlocalStorage));

// fonction fenêtre pop up d'ajout au panier 
const popupConfirmation = () => {
  if (window.confirm(`Votre/Vos ${productOption.quantity}  ${productOption.title} couleur : ${productOption.color} a bien été ajouté au panier 
  consultez le panier OK ou revenir à l'accueil ANNULER` )) {
    window.location.href = "cart.html";
  } else {
     window.location.href = "index.html";
  }
}
popupConfirmation();
})

      

  

  
  
  
  
  
  
  

  
  















