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
