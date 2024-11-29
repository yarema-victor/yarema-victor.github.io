const swiper = new Swiper('.swiper-container', {
    slidesPerView: 4,
    spaceBetween: 30,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        1024: { slidesPerView: 4, spaceBetween: 30 },
        768: { slidesPerView: 2, spaceBetween: 20 },
        480: { slidesPerView: 1, spaceBetween: 10 },
    },
});
