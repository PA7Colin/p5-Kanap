main();
async function getProducts() {
  const addProducts = await fetch("http://localhost:3000/api/products");
  return await addProducts.json();
}
// Données API // 
async function main() {
  await getProducts()
    .then( arrayProduct => { 
    
      for (let product of arrayProduct) {
        inserArticle(product)
      }
    })
    .catch(function (error) {
      return error;
    });
}
// Affichage dynamique des produits dans la page d'acceuil //
function inserArticle(produit) {
  let templateArticle = `
  <a href="./product.html?id=${produit._id}">
  <article>
  <img src="${produit.imageUrl}" alt="${produit.altTxt}">
  <p class="productDescription">${produit.description}</p>
  <h3 class="productName">${produit.name}</h3>
  </article>
  </a>
  `;
  document.getElementById("items").insertAdjacentHTML('beforeend', templateArticle);
}