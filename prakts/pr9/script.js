const jsonUrl = "https://yarema-victor.github.io/prakts/pr9/products.json";

let swiper;

function initSwiper() {
    if (swiper) swiper.destroy();
    swiper = new Swiper('.swiper-container', {
        slidesPerView: 4,
        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            1024: { slidesPerView: 4 },
            768: { slidesPerView: 2 },
            480: { slidesPerView: 1 },
        },
    });
}

async function loadProducts() {
    try {
        const response = await fetch(jsonUrl);
        const data = await response.json();
        const lang = localStorage.getItem("language") || "uk";

        document.querySelector('.main-title').textContent = data.localization[lang].title;

        renderProducts(data.products, data.localization[lang]);
        initSwiper();
    } catch (error) {
        console.error("Помилка завантаження даних:", error);
    }
}

function renderProducts(products, localization) {
    const wrapper = document.getElementById("products");
    wrapper.innerHTML = "";

    const lang = localStorage.getItem("language") || "uk";

    products.forEach(product => {
        const productCard = `
            <div class="swiper-slide">
                <div class="product-card">
                    ${product.sticker ? `<div class="sticker sticker-${product.sticker === 'Новинка' ? 'new' : 'hit'}">${localization[`sticker_${product.sticker === 'Новинка' ? 'new' : 'hit'}`]}</div>` : ""}
                    <h2 class="product-origin">
                        <a href="${product.category_url}" target="_blank">${product.category[lang]}</a> <!-- Посилання на категорію -->
                    </h2>
                    <a href="${product.url}" target="_blank">
                        <img src="${product.image}" alt="${product.name[lang]}" class="product-image">
                    </a>
                    <h3 class="product-title">
                        <a href="${product.url}" target="_blank">${product.name[lang]}</a>
                    </h3>
                    <p class="product-price">
                        ${product.price?.old ? `<span class="old-price">${product.price.old} ₴</span>` : ""}
                        ${product.price?.new ? `<span class="new-price">${product.price.new} ₴</span>` : `<button class="btn btn-disabled">${localization.button_disabled}</button>`}
                    </p>
                    ${product.price?.new ? `<button class="btn btn-primary">${localization.button_cart}</button>` : ""}
                </div>
            </div>
        `;
        wrapper.innerHTML += productCard;
    });
}

function setLanguage(language) {
    localStorage.setItem("language", language);
    loadProducts();
}

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();

    const languageSelector = document.getElementById("language-selector");
    languageSelector.value = localStorage.getItem("language") || "uk";
    languageSelector.addEventListener("change", event => {
        setLanguage(event.target.value);
    });
});
