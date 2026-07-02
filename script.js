// ==========================
// SNEAKER SHOP SCRIPT
// ==========================

// ---------- LOCAL STORAGE ----------

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// ---------- TOAST MESSAGE ----------

function showToast(message){
    let toast = document.getElementById("toast");

    if(!toast){
        toast = document.createElement("div");
        toast.id = "toast";
        document.body.appendChild(toast);
    }

    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// ---------- SAVE ----------

function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function saveFavorites(){
    localStorage.setItem("favorites", JSON.stringify(favorites));
    updateFavoriteCount();
}

// ---------- COUNTERS ----------

function updateCartCount(){
    let count = document.getElementById("cart-count");

    if(!count) return;

    let total = 0;

    cart.forEach(item => {
        total += item.quantity;
    });

    count.innerText = total;
}

function updateFavoriteCount(){
    let count = document.getElementById("fav-count");

    if(!count) return;

    count.innerText = favorites.length;
}

// ==========================
// CART FUNCTIONS
// ==========================

function addToCart(id, name, price, image){
    let existing = cart.find(item => item.id === id);

    if(existing){
        existing.quantity++;
    }else{
        cart.push({
            id: id,
            name: name,
            price: Number(price),
            image: image,
            quantity: 1
        });
    }

    saveCart();

    showToast(name + " added to cart!");
}

function removeFromCart(id){
    cart = cart.filter(item => item.id !== id);

    saveCart();

    location.reload();
}

function changeQuantity(id, amount){
    let item = cart.find(item => item.id === id);

    if(!item) return;

    item.quantity += amount;

    if(item.quantity <= 0){
        removeFromCart(id);
        return;
    }

    saveCart();

    location.reload();
}

function clearCart(){
    cart = [];

    saveCart();

    location.reload();
}

function getCartTotal(){
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    return total;
}

function getCartItems(){
    return cart;
}

// ==========================
// FAVORITES
// ==========================

function addToFavorites(id, name, price, image){
    let exists = favorites.find(item => item.id === id);

    if(exists){
        showToast("This sneaker is already in your favorites.");
        return;
    }

    favorites.push({
        id: id,
        name: name,
        price: Number(price),
        image: image
    });

    saveFavorites();

    showToast(name + " added to favorites!");
}

function removeFavorite(id){
    favorites = favorites.filter(item => item.id !== id);

    saveFavorites();

    location.reload();
}

function getFavorites(){
    return favorites;
}

// ==========================
// FILTER
// ==========================

function filterSneakers(){
    let brand = document.getElementById("brand").value;
    let price = document.getElementById("price").value;
    let size = document.getElementById("size").value;

    if(size === ""){
        showToast("Please select a size.");
        return;
    }

    document.getElementById("products-grid").style.display = "grid";

    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let brandMatch =
            brand === "all" ||
            card.classList.contains(brand);

        let priceMatch = true;

        if(price !== "all"){
            priceMatch =
                Number(card.dataset.price) <= Number(price);
        }

        card.style.display =
            brandMatch && priceMatch
            ? "block"
            : "none";
    });
}

// ==========================
// START
// ==========================

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    updateFavoriteCount();
});

function toggleMenu(){
    let nav = document.getElementById("nav-menu");

    if(!nav) return;

    nav.classList.toggle("active");
}