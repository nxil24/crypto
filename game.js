const treasures = [
    { name: "Gold Coin", image: "gold-coin.png", rarity: "common", value: 10 },
    { name: "Silver Sword", image: "silver-sword.png", rarity: "common", value: 20 },
    { name: "Diamond Ring", image: "diamond-ring.png", rarity: "rare", value: 50 },
    { name: "Magic Potion", image: "magic-potion.png", rarity: "rare", value: 30 },
    { name: "Ancient Artifact", image: "ancient-artifact.png", rarity: "epic", value: 100 }
];

const itemsForSale = [
    { name: "Mystic Map", image: "mystic-map.png", cost: 30 },
    { name: "Golden Key", image: "golden-key.png", cost: 50 }
];

let collectedTreasures = JSON.parse(localStorage.getItem("collectedTreasures")) || [];
let coinBalance = parseInt(localStorage.getItem("coinBalance")) || 0;

function updateUI() {
    // Update coin balance
    document.getElementById("coin-balance").innerText = coinBalance;

    // Update treasure info
    const treasureInfo = document.getElementById("treasure-info");
    treasureInfo.innerText = '';

    // Update collected treasures
    const nftList = document.getElementById("nft-list");
    nftList.innerHTML = '';
    collectedTreasures.forEach((treasure) => {
        const nftItem = document.createElement('div');
        nftItem.classList.add('nft-item');
        nftItem.innerHTML = `
            <img src="${treasure.image}" alt="${treasure.name}">
            <p>${treasure.name}</p>
        `;
        nftList.appendChild(nftItem);
    });

    // Update shop items
    const shopItemsContainer = document.getElementById("shop-items");
    shopItemsContainer.innerHTML = ''; // clear previous items
    itemsForSale.forEach(item => {
        const shopItemDiv = document.createElement('div');
        shopItemDiv.classList.add('shop-item');
        shopItemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name}</p>
            <p>Cost: ${item.cost} coins</p>
            <button onclick="selectItemToBuy('${item.name}')">Select</button>
        `;
        shopItemsContainer.appendChild(shopItemDiv);
    });
}

// Function to explore and collect treasure
function explore() {
    const randomTreasure = treasures[Math.floor(Math.random() * treasures.length)];
    coinBalance += randomTreasure.value;
    document.getElementById("treasure-info").innerText = `You found a ${randomTreasure.name}!`;

    // Show animation and update UI
    showTreasureAnimation(randomTreasure);
    addTreasure(randomTreasure);
    playSound();
    localStorage.setItem("coinBalance", coinBalance);
    updateUI();
}

// Add treasure to the collection
function addTreasure(treasure) {
    collectedTreasures.push(treasure);
    localStorage.setItem("collectedTreasures", JSON.stringify(collectedTreasures));
}

// Show treasure animation
function showTreasureAnimation(treasure) {
    const animationDiv = document.getElementById("treasure-animation");
    animationDiv.innerHTML = `<img src="${treasure.image}" alt="${treasure.name}">`;
    animationDiv.style.display = "block";
    setTimeout(() => {
        animationDiv.style.display = "none";
    }, 1000);
}

// Play sound when treasure is found
function playSound() {
    const sound = new Audio('treasure-sound.mp3');
    sound.play();
}

// Function to open the shop
document.getElementById("shop-btn").addEventListener("click", () => {
    document.getElementById("shop").style.display = "block";
});

// Function to close the shop
document.getElementById("close-shop-btn").addEventListener("click", () => {
    document.getElementById("shop").style.display = "none";
});

// Function to buy an item from the shop
function selectItemToBuy(itemName) {
    const selectedItem = itemsForSale.find(item => item.name === itemName);
    if (coinBalance >= selectedItem.cost) {
        coinBalance -= selectedItem.cost;
        localStorage.setItem("coinBalance", coinBalance);
        alert(`You bought a ${selectedItem.name}!`);
        updateUI();
    } else {
        alert("You don't have enough coins!");
    }
}

document.getElementById("explore-btn").addEventListener("click", explore);

// Initialize UI
updateUI();
