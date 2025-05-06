// xử lí tim kiêm sản phẩm
const formSubmit = document.querySelector(".search-product");

// search product
formSubmit.onsubmit = (e) => {
    e.preventDefault();
    const productNames = document.querySelectorAll(".product-name");
    const searchValue = document.querySelector(".data-entry").value;
    const itemProducts = document.querySelectorAll(".item");

    productNames.forEach((productName, index) => {
        if (
            !productName.innerText
                .toUpperCase()
                .includes(searchValue.toUpperCase())
        ) {
            itemProducts[index].style.display = "none";
            document.querySelector(".product-special").style.display = "none";
        } else {
            itemProducts[index].style.display = "block"; // Hiện lại nếu khớp
            document.querySelector(".product-special").style.display = "block";
        }
    });
};

// update quantity product

const length = document.querySelectorAll(".item").length;
const quantityProduct = document.querySelector(".quantity");
quantityProduct.innerText = `Xem tất cả ${length} kết quả`;
// sort product
const orderSelectElement = document.querySelector(".order");
orderSelectElement.onchange = () => {
    // lấy value của select
    const valueSelect = orderSelectElement.value;
    // lấy các items product
    const listProduct = document.querySelector(".product .list-product");
    const itemProducts = Array.from(listProduct.querySelectorAll(".item"));

    if (valueSelect.trim() === "Thứ tự mặc định") {
        location.reload();
        return;
    } else if (valueSelect.trim() === "thứ tự theo giá: thấp đến cao") {
        itemProducts.sort((a, b) => {
            const priceA = parseInt(
                a
                    .querySelector(".price-product")
                    .textContent.replace("VND", "")
                    .split(".")
                    .join("")
            );
            const priceB = parseInt(
                b
                    .querySelector(".price-product")
                    .textContent.replace("VND", "")
                    .split(".")
                    .join("")
            );
            return priceA - priceB;
        });
    } else if (valueSelect.trim() === "thứ tự theo giá: cao xuống thấp") {
        itemProducts.sort((a, b) => {
            const priceA = parseInt(
                a
                    .querySelector(".price-product")
                    .textContent.replace("VND", "")
                    .split(".")
                    .join("")
            );
            const priceB = parseInt(
                b
                    .querySelector(".price-product")
                    .textContent.replace("VND", "")
                    .split(".")
                    .join("")
            );
            return priceB - priceA;
        });
    }
    listProduct.innerHTML = "";
    itemProducts.forEach((itemProduct) => listProduct.appendChild(itemProduct));
};
// move slider

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const btnSliderLeft = $(".btn-slider-left");
const btnSliderRight = $(".btn-slider-right");
const listProduct = $(".product-special .list-product");

const quantitySlides = $$(".product-special .item");

let countSlide = 0;
let maxSlide = 3;

btnSliderRight.onclick = () => {
    if (countSlide < maxSlide - 1) {
        countSlide++;
        listProduct.style.transform = `translateX(-${countSlide * 100}%)`;
    } else {
        countSlide = 0;
        listProduct.style.transform = `translateX(-${countSlide * 100}%)`;
    }
};
btnSliderLeft.onclick = () => {
    if (countSlide > 0) {
        countSlide--;
        listProduct.style.transform = `translateX(-${countSlide * 100}%)`;
    }
};
