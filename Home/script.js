import Modal from "../common/dropModal/modal.js";
import { AddToCart } from "../common/addToCart/addToCart.js";

// Modal
const loginUser = document.querySelector(".login");

const modalLogin = new Modal({
    templateId: "modal-login",
});

loginUser.onclick = () => {
    modalLogin.open();
};

// AddToCart
AddToCart();

// background slider from hero
const wrapperSlide = document.querySelector(".wrapper-hero");
const sliders = document.querySelectorAll(".wrapper-container");

let currentSlide = 0;
const totalSlide = sliders.length;

function moveSlider() {
    currentSlide++;
    if (currentSlide >= totalSlide) {
        currentSlide = 0;
    }
    wrapperSlide.style.transform = `translateX(-${currentSlide * 100}%)`;
}

if (wrapperSlide) {
    setInterval(moveSlider, 2000);
}

// swiperJS slider from useful infomation
let swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});
