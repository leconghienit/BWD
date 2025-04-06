export function AddToCart() {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const cartIcon = $(".cart-icon");
    const cartClose = $(".cart-close");

    const cart = $(".cart");
    // xử lí sự kiện mở / đóng giỏ hàng

    cartIcon.onclick = () => {
        cart.classList.add("active");
    };
    cartClose.onclick = () => {
        cart.classList.remove("active");
    };

    const addToCartButtons = $$(".add-to-cart");
    addToCartButtons.forEach((button) => {
        button.onclick = (e) => {
            const productItem = e.target.closest(".item");
            addToCart(productItem);
        };
    });

    const cartContent = $(".cart-content");
    const addToCart = (productItem) => {
        const productName =
            productItem.querySelector(".product-name").textContent;
        const productPrice =
            productItem.querySelector(".price-product").textContent;
        const productImgSrc = productItem.querySelector("img").src;

        // kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        const cartProductTitles = cartContent.querySelectorAll(
            ".cart-product-title"
        );
        for (let cartProductTitle of cartProductTitles) {
            if (cartProductTitle.textContent === productName) {
                alert(
                    "Sản phẩm này đã có trong giỏ hàng, quý khách có thể chọn sản phẩm khác."
                );
                return;
            }
        }
        const cartBox = document.createElement("div");
        cartBox.className = "cart-box";

        cartBox.innerHTML = ` 
        <img src="${productImgSrc}" alt="" class="cart-img" />
        <div class="cart-detail">
            <h2 class="cart-product-title">${productName}</h2>
            <span class="cart-price">${productPrice}</span>
            <div class="cart-quantity">
                <button class="decrement">-</button>
                <span class="number">1</span>
                <button class="increment">+</button>
            </div>
        </div>
        <i class="fa-solid fa-trash cart-remove"></i>
    `;
        cartContent.insertBefore(cartBox, cartContent.firstChild);

        // xoá sản phẩm ra khỏi giỏ hàng

        $(".cart-remove").onclick = () => {
            cartBox.remove();

            updateTotalPrice();
        };

        // tăng / giảm sản phẩm
        cartBox.querySelector(".cart-quantity").onclick = (e) => {
            // lấy phần tử có class number
            const numberElement = cartBox.querySelector(".number");
            let quantity = parseInt(numberElement.textContent);

            if (e.target.closest(".decrement") && quantity > 1) {
                quantity--;
            } else if (e.target.closest(".increment")) {
                quantity++;
            }
            numberElement.textContent = quantity;
            updateTotalPrice();
        };

        updateTotalPrice();
    };

    // xử lí update giá tiền sản phẩm
    const updateTotalPrice = () => {
        const totalPrice = $(".total-price");
        const cartBoxes = cartContent.querySelectorAll(".cart-box");

        let total = 0;
        cartBoxes.forEach((cartBox) => {
            const cartPriceElement = cartBox.querySelector(".cart-price");
            const numberElement = cartBox.querySelector(".number");
            let price = cartPriceElement.textContent.replace("VND", "").trim();
            price = parseInt(price.split(".").join(""));

            // const price = parseFloat(
            //     cartPriceElement.textContent.replace("VND", "")
            // );
            const quantity = parseInt(numberElement.textContent);

            total += price * quantity;
            total = total.toLocaleString("vi-VN") + " VND";
        });

        totalPrice.textContent = total;
    };

    // let cartItemCount = 0;
    // const updateCartCount = (change) => {
    //     const cartItemCountBadge = $(".cart-item-count");
    //     cartItemCount += change; // Sửa chỗ này để cộng hoặc trừ đúng số lượng

    //     if (cartItemCount > 0) {
    //         cartItemCountBadge.style.visibility = "visible";
    //         cartItemCountBadge.textContent = cartItemCount;
    //     } else {
    //         cartItemCountBadge.style.visibility = "hidden";
    //         cartItemCountBadge.textContent = "";
    //     }
    // };

    const buyNowButton = $(".btn-buy");
    buyNowButton.addEventListener("click", () => {
        const cartBoxes = cartContent.querySelectorAll(".cart-box");
        if (cartBoxes.length === 0) {
            alert(
                "Your cart is empty. Please add items to your cart before buying."
            );
            return;
        }
        cartBoxes.forEach((cartBox) => cartBox.remove());

        updateTotalPrice();
        alert("Cảm ơn vì đã ủng hộ chúng tôi!");
    });
}
