// ======================
// COMPLETE LOADER TIMELINE (FIXED LETTER ANIMATION)
// ======================
document.body.style.overflow = 'hidden';

document.addEventListener("DOMContentLoaded", () => {

    const title = document.querySelector('.loader-name-inner');
    const text = title.textContent.trim();
    title.innerHTML = '';

    // split into letters
    text.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        title.appendChild(span);
    });

    // ======================
    // GSAP TIMELINE
    // ======================
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    const counter = document.querySelector('.loader-counter');
    const progressBar = document.getElementById('progressBar');
    const label = document.querySelector('.loader-label');
    const pct = { val: 0 };

    tl.to('.loader-brand', { opacity: 1, duration: 0.6, delay: 0.2 })
        .to('.loader-label', { opacity: 1, duration: 0.5 }, '<')
        .to('.loader-counter', { opacity: 1, duration: 0.5 }, '<')

        // LETTER BY LETTER ENTRY
        .to('.loader-name-inner span', {
            y: '0%',
            duration: 0.9,
            stagger: 0.07,
            ease: 'expo.out'
        }, '-=0.1')

        .to('.loader-tagline', { opacity: 1, duration: 0.6 }, '-=0.5')

        .to(pct, {
            val: 100,
            duration: 2.2,
            ease: 'power1.inOut',
            onUpdate() {
                const v = Math.round(pct.val);
                counter.textContent = v + '%';
                progressBar.style.width = v + '%';

                if (v < 20) label.innerHTML = `<span class="dot"></span>Initializing`;
                else if (v < 45) label.innerHTML = `<span class="dot"></span>Loading assets`;
                else if (v < 70) label.innerHTML = `<span class="dot"></span>Building world`;
                else if (v < 90) label.innerHTML = `<span class="dot"></span>Almost there`;
                else label.innerHTML = `<span class="dot"></span>Ready`;
            }
        }, '+=0.2')

        .to({}, { duration: 0.4 })

        // LETTER EXIT (stagger up)
        .to('.loader-name-inner span', {
            y: '-120%',
            duration: 0.6,
            stagger: 0.05,
            ease: 'expo.in'
        })

        .to('.loader-tagline', { opacity: 0, duration: 0.4 }, '<')
        .to('.loader-brand', { opacity: 0, duration: 0.4 }, '<')
        .to('.loader-counter', { opacity: 0, duration: 0.3 }, '<')
        .to('.loader-label', { opacity: 0, duration: 0.3 }, '<')

        .to('#loader', {
            autoAlpha: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
                document.getElementById('loader').style.display = 'none';
                document.body.style.overflow = '';

                // 🔥 AOS INIT HERE (not before)
                AOS.init({
                    offset: 120,
                    delay: 0,
                    duration: 800,
                    easing: 'ease',
                    once: true,
                    mirror: false
                });

                AOS.refresh(); // force recalc positions
            }
        }, '-=0.2')

        .to('.wrapper', { autoAlpha: 1, duration: 0.8, ease: 'power2.out' }, '-=0.4');

});
