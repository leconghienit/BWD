const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");
const priceDisplay = document.getElementById("priceRange");

function updatePriceDisplay() {
    let minPrice = parseInt(minPriceInput.value);
    let maxPrice = parseInt(maxPriceInput.value);

    if (minPrice > maxPrice) {
        [minPrice, maxPrice] = [maxPrice, minPrice];
    }

    priceDisplay.textContent =
        new Intl.NumberFormat("vi-VN").format(minPrice) +
        " ₫ – " +
        new Intl.NumberFormat("vi-VN").format(maxPrice) +
        " ₫";
}

minPriceInput.addEventListener("input", updatePriceDisplay);
maxPriceInput.addEventListener("input", updatePriceDisplay);
