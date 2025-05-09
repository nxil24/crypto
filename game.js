// Initial setup
const treasures = [
    { name: "Gold Coin", image: "gold-coin.png", rarity: "common" },
    { name: "Silver Sword", image: "silver-sword.png", rarity: "common" },
    { name: "Diamond Ring", image: "diamond-ring.png", rarity: "rare" },
    { name: "Magic Potion", image: "magic-potion.png", rarity: "rare" },
    { name: "Ancient Artifact", image: "ancient-artifact.png", rarity: "epic" }
];

let collectedTreasures = JSON.parse(localStorage.getItem("collectedTreasures")) || []; // Retrieve collection from local storage

// Update the UI
function updateUI() {
    document.getElementById("status").innerText = `Status: Ready to explore!`;
    document.getElementById("treasure-info").innerText = '';

    // Update the NFT collection display
    const nftList = document.getElementById("nft-list");
    nftList.innerHTML = ''; // Clear current collection

    collectedTreasures.forEach((treasure) => {
        const nftItem = document.createElement('div');
        nftItem.classList.add('nft-item');
        nftItem.innerHTML = `
            <img src="${treasure.image}" alt="${treasure.name}">
            <p>${treasure.name}</p>
        `;
        nftList.appendChild(nftItem);
    });
}

// Add a new treasure to the collection
function addTreasure(treasure) {
    collectedTreasures.push(treasure);
    localStorage.setItem("collectedTreasures", JSON.stringify(collectedTreasures)); // Save collection to local storage
    updateUI();
}

// Show an animation when a treasure is discovered
function showTreasureAnimation(treasure) {
    const animationDiv = document.getElementById("treasure-animation");
    animationDiv.innerHTML = `<img src="${treasure.image}" alt="${treasure.name}">`;
    animationDiv.style.display = "block";
    animationDiv.style.animation = "treasureFound 1s ease-out";

    // Hide the animation after 1 second
    setTimeout(() => {
        animationDiv.style.display = "none";
    }, 1000);
}

// Explore function
function explore() {
    const randomTreasure = treasures[Math.floor(Math.random() * treasures.length)];
    document.getElementById("treasure-info").innerText = `You found a ${randomTreasure.name}!`;

    // Show animation for the treasure
    showTreasureAnimation(randomTreasure);

    // Add the discovered treasure to the collection
    addTreasure(randomTreasure);
}

// Add a sound effect
function playSound() {
    const sound = new Audio('treasure-sound.mp3');
    sound.play();
}

// Initialize the game
document.getElementById("explore-btn").addEventListener("click", () => {
    explore();
    playSound(); // Play sound when the treasure is discovered
});
updateUI();
