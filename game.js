// Initial game setup
const treasures = ["Gold Coin", "Silver Sword", "Diamond Ring", "Magic Potion", "Ancient Artifact"];
let collectedTreasures = JSON.parse(localStorage.getItem("collectedTreasures")) || []; // Retrieve collection from local storage

// Update the status and collection display
function updateUI() {
    document.getElementById("status").innerText = `Status: Ready to explore!`;
    document.getElementById("treasure-info").innerText = '';

    // Update the NFT collection display
    const nftList = document.getElementById("nft-list");
    nftList.innerHTML = ''; // Clear current collection

    collectedTreasures.forEach((treasure, index) => {
        const nftItem = document.createElement('div');
        nftItem.classList.add('nft-item');
        nftItem.innerHTML = `
            <p>${treasure}</p>
            <button onclick="removeTreasure(${index})">Remove</button>
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

// Explore function that simulates discovering a treasure
function explore() {
    const randomTreasure = treasures[Math.floor(Math.random() * treasures.length)];
    document.getElementById("treasure-info").innerText = `You found a ${randomTreasure}!`;

    // Add the discovered treasure to the collection
    addTreasure(randomTreasure);
}

// Remove a treasure from the collection
function removeTreasure(index) {
    collectedTreasures.splice(index, 1);
    localStorage.setItem("collectedTreasures", JSON.stringify(collectedTreasures)); // Save collection to local storage
    updateUI();
}

// Initialize the game
document.getElementById("explore-btn").addEventListener("click", explore);
updateUI();
