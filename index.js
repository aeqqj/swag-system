const inventoryForm = document.getElementById("inventory-form");
const itemInputName = document.getElementById("input-item");
const inventoryList = document.getElementById("inventory-list");
const noItemsMessage = document.getElementById("no-items-message");

let inventory = [];

function loadInventory() {
    try {
        const savedInventory = localStorage.getItem("simpleInventory");
        if (savedInventory) {
            inventory = JSON.parse(savedInventory);
        }
    } catch (error) {
        console.error("Error loading inventory", error);
        inventory = [];
    }
}

function saveInventory() {
    try {
        localStorage.setItem("simpleInventory", JSON.stringify(inventory));
    } catch (error) {
        console.error("Error saving inventory", error);
    }
}

function renderInventory() {
    inventoryList.innerHTML = "";

    if (inventory.length === 0) {
        noItemsMessage.style.display = "block";
        return;
    }

    noItemsMessage.style.display = "none";

    inventory.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.coolness}</td>
            <td>
                <button class="removeBtn" data-index="${index}">Remove</button>
            </td>
        `;
        inventoryList.appendChild(row);
    });

    document.querySelectorAll(".removeBtn").forEach(btn => {
        btn.addEventListener("click", removeItem);
    });
}

function addItem(e) {
    e.preventDefault();

    const name = itemInputName.value.trim();
    const coolness = randomizer();

    if (name === "") {
        alert("Enter a name please");
        return;
    }

    const newItem = {
        name: name,
        coolness: coolness
    };

    inventory.push(newItem);
    saveInventory();
    renderInventory();

    itemInputName.value = "";
}

function removeItem(e) {
    const index = parseInt(e.target.getAttribute("data-index"));
    if (confirm("Remove this item?")) {
        inventory.splice(index, 1);
        saveInventory();
        renderInventory();
    }
}

function randomizer() {
    const rand = Math.floor(Math.random() * 3);
    if (rand === 0) return "swag";
    if (rand === 1) return "uncool";
    return "loser";
}

inventoryForm.addEventListener("submit", addItem);

loadInventory();
renderInventory();

