let favorites = [];

function addToFavorites(name){

  if(!favorites.includes(name)){
    favorites.push(name);
  }

  updateFavorites();

}

function updateFavorites(){

  let box = document.getElementById("favorite-items");
  let count = document.getElementById("fav-count");

  if(!box || !count){
    return;
  }

  box.innerHTML = "";

  favorites.forEach((item,index)=>{

    box.innerHTML += `
      <div style="margin-bottom:10px;">
        ${item}
        <button onclick="removeFavorite(${index})">❌</button>
      </div>
    `;

  });

  count.textContent = favorites.length;

}

function removeFavorite(index){

  favorites.splice(index,1);

  updateFavorites();

}

function toggleFavorites(){

  let favBox = document.getElementById("favorites");

  if(!favBox){
    return;
  }

  if(favBox.style.display === "none"){
    favBox.style.display = "block";
  }else{
    favBox.style.display = "none";
  }

}

function filterSneakers(){

  let brand =
  document.getElementById("brand").value;

  let price =
  document.getElementById("price").value;

  let size =
  document.getElementById("size").value;

  if(size === ""){

    alert("Please select a size");

    return;

  }

  document.getElementById("products-grid")
  .style.display = "grid";

  let cards =
  document.querySelectorAll(".card");

  cards.forEach(card => {

    let brandMatch =
    brand === "all" ||
    card.classList.contains(brand);

    let priceMatch = true;

    if(price !== "all"){

      priceMatch =
      Number(card.dataset.price)
      <=
      Number(price);

    }

    if(brandMatch && priceMatch){

      card.style.display = "block";

    }else{

      card.style.display = "none";

    }

  });

}

function addSneaker(){

let sneakers =
JSON.parse(localStorage.getItem("sneakers"))
|| [];

let sneaker = {

id: Date.now(),

name:
document.getElementById("name").value,

price:
document.getElementById("price").value,

brand:
document.getElementById("brand").value,

image:
document.getElementById("image").value,

description:
document.getElementById("description").value

};

sneakers.push(sneaker);

localStorage.setItem(
"sneakers",
JSON.stringify(sneakers)
);

alert("Sneaker Added!");

}