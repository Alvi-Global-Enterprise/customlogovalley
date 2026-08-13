// ======================
// SERVICE ITEM HOVER
// ======================
document.querySelectorAll('.service-item').forEach(item => {
    let timeout;
    item.addEventListener('mouseenter', () => {
        clearTimeout(timeout);
        document.querySelectorAll('.service-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
    });
    item.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => item.classList.remove('active'), 200);
    });
});

// ======================
// CURSOR FOLLOW
// ======================
document.addEventListener("mousemove", (e) => {
    document.querySelectorAll(".cursor1, .cursor2").forEach(cursor => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
});

// ======================
// COUNTER ON SCROLL
// ======================
if (typeof jQuery !== 'undefined') jQuery(window).scroll(function startCounter() {
    if (jQuery(window).scrollTop() > 1500) {
        jQuery(window).off("scroll", startCounter);
        jQuery('.count-numb').each(function () {
            const $this = jQuery(this);
            jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
                duration: 9000,
                easing: 'swing',
                step: function () { $this.text(Math.ceil(this.Counter)); }
            });
        });
    }
});

// ======================
// PRICING SLIDERS
// ======================
function initPricingSliders() {
    if (typeof Swiper === 'undefined') return;
    document.querySelectorAll('.packages-slider').forEach(sliderContainer => {
        if (sliderContainer.swiper) sliderContainer.swiper.destroy(true, true);

        const swiperInstance = new Swiper(sliderContainer, {
            slidesPerView: 3,
            spaceBetween: 20,
            loop: true,
            speed: 800,
            grabCursor: true,
            autoplay: { delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true },
            navigation: {
                nextEl: sliderContainer.querySelector('.swiper-button-next'),
                prevEl: sliderContainer.querySelector('.swiper-button-prev'),
            },
            breakpoints: {
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });

        sliderContainer.swiper = swiperInstance;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initPricingSliders();

    // Re-init sliders on tab shown
    const tabButtons = document.querySelectorAll('#myTab button');
    tabButtons.forEach(tab => {
        tab.addEventListener('shown.bs.tab', (e) => {
            // Wait for DOM update
            setTimeout(() => initPricingSliders(), 50);
        });
    });
});

// ======================
// SCROLL PROGRESS BAR
// ======================
function updateScrollProgress() {
    const scrollBar = document.getElementById('scrollProgressBar');
    if (!scrollBar) return;

    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;

    scrollBar.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);
window.addEventListener('resize', updateScrollProgress);
updateScrollProgress();

// ======================
// MENU HOVER EFFECT
// ======================
document.querySelectorAll('.menu_hover').forEach(link => {
    const text = link.textContent.trim();
    link.innerHTML = '';

    const wrapper = document.createElement('span');
    wrapper.className = 'menu-hover-wrapper';

    const top = document.createElement('span');
    top.className = 'menu-hover-top';

    const bottom = document.createElement('span');
    bottom.className = 'menu-hover-bottom';

    text.split('').forEach((char, index) => {
        const span1 = document.createElement('span');
        span1.textContent = char === ' ' ? '\u00A0' : char;
        span1.style.setProperty('--i', index);

        const span2 = document.createElement('span');
        span2.textContent = char === ' ' ? '\u00A0' : char;
        span2.style.setProperty('--i', index);

        top.appendChild(span1);
        bottom.appendChild(span2);
    });

    wrapper.appendChild(top);
    wrapper.appendChild(bottom);
    link.appendChild(wrapper);
});

// ======================
// STICKY HEADER
// ======================
window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (!header) return;

    if (window.scrollY > 50) header.classList.add("sticky");
    else header.classList.remove("sticky");
});