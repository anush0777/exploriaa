// Sample Hotel Data
let hotels = [
    {name:"Hotel Everest", place:"Kathmandu", price:2500, rating:4.5, amenities:["wifi","ac","food"], img:"https://picsum.photos/400/200?1"},
    {name:"Lake View Resort", place:"Pokhara", price:1800, rating:4.2, amenities:["wifi","pool"], img:"https://picsum.photos/400/200?2"},
    {name:"Himalayan Inn", place:"Kathmandu", price:3000, rating:4.8, amenities:["wifi","ac","food"], img:"https://picsum.photos/400/200?3"},
    {name:"Blue Diamond", place:"Biratnagar", price:1200, rating:3.9, amenities:["wifi"], img:"https://picsum.photos/400/200?4"},
    {name:"Peace Palace", place:"Pokhara", price:2100, rating:4.3, amenities:["wifi","spa"], img:"https://picsum.photos/400/200?5"},
    {name:"Sunrise Hotel", place:"Kathmandu", price:2000, rating:4.1, amenities:["wifi","ac"], img:"https://picsum.photos/400/200?6"},
    {name:"Mountain Lodge", place:"Pokhara", price:1700, rating:4.0, amenities:["wifi","pool"], img:"https://picsum.photos/400/200?7"},
];

// Pagination
let currentPage = 1;
const hotelsPerPage = 4;

// Wishlist
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const hotelList = document.getElementById("hotelList");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

// Display Hotels
function displayHotels(list) {
    hotelList.innerHTML = "";
    list.forEach((h, index) => {
        hotelList.innerHTML += `
        <div class="hotel-card" style="animation-delay:${index * 0.1}s">
            <span class="heart ${wishlist.includes(h.name)?'active':''}" onclick="toggleFav('${h.name}')">❤️</span>
            <img src="${h.img}" alt="${h.name}">
            <div class="info">
                <h3>${h.name}</h3>
                <p>Location: ${h.place}</p>
                <p class="price">Rs ${h.price}</p>
                <p class="rating">⭐ ${h.rating}</p>
                <div class="amenities">${h.amenities.map(a=>icon(a)).join('')}</div>
            </div>
        </div>
        `;
    });
    renderPagination(list.length);
}

// Amenities Icons
function icon(a){
    const icons = { wifi:"📶", ac:"❄️", food:"🍽️", spa:"💆", pool:"🏊" };
    return `<span title="${a}">${icons[a]}</span>`;
}

// Wishlist Toggle
function toggleFav(name){
    if(wishlist.includes(name)) wishlist = wishlist.filter(n=>n!==name);
    else wishlist.push(name);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    // Reset hearts animation
    const hearts = document.querySelectorAll(".heart");
    hearts.forEach(h => h.classList.remove("active"));

    // Re-render to apply active heart pop
    filterHotels();
}

// Filter + Sort + Pagination
function filterHotels(){
    let filtered = hotels.filter(h => h.place.toLowerCase().includes(searchInput.value.toLowerCase()));
    if(sortSelect.value==="price") filtered.sort((a,b)=>a.price-b.price);
    if(sortSelect.value==="rating") filtered.sort((a,b)=>b.rating-a.rating);

    const start = (currentPage-1)*hotelsPerPage;
    displayHotels(filtered.slice(start,start+hotelsPerPage));
}

// Pagination Buttons
function renderPagination(total){
    const pages = Math.ceil(total/hotelsPerPage);
    const container = document.getElementById("pagination");
    container.innerHTML = "";
    for(let i=1;i<=pages;i++){
        container.innerHTML += `<button class="page-btn ${i===currentPage?'active':''}" onclick="gotoPage(${i})">${i}</button>`;
    }
}

function gotoPage(p){ 
    currentPage = p; 
    filterHotels();
}

// Event Listeners
searchInput.addEventListener("input",()=>{ currentPage=1; filterHotels(); });
sortSelect.addEventListener("change",()=>{ currentPage=1; filterHotels(); });

// Initial Display
filterHotels();
