const weddingDate = new Date("April 17, 2026 00:00:00").getTime();

let prevDays = null;
let prevMinutes = null;
let prevSeconds = null;

function updateCountdown(){
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if(diff > 0){
        const newDays = Math.floor(diff / (1000 * 60 * 60 * 24));
        const newMinutes = Math.floor((diff / (1000 * 60)) % 60);
        const newSeconds = Math.floor((diff / 1000) % 60);

        const daysEl = document.getElementById("days");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        if(newDays !== prevDays){
            daysEl.classList.remove('flip'); void daysEl.offsetWidth;
            daysEl.classList.add('flip');
            daysEl.innerText = String(newDays).padStart(2, '0');
            prevDays = newDays;
        }

        if(newMinutes !== prevMinutes){
            minutesEl.classList.remove('flip'); void minutesEl.offsetWidth;
            minutesEl.classList.add('flip');
            minutesEl.innerText = String(newMinutes).padStart(2, '0');
            prevMinutes = newMinutes;
        }

        if(newSeconds !== prevSeconds){
            secondsEl.classList.remove('flip'); void secondsEl.offsetWidth;
            secondsEl.classList.add('flip');
            secondsEl.innerText = String(newSeconds).padStart(2, '0');

            // pulse glow on seconds container
            const secContainer = secondsEl.parentElement;
            secContainer.classList.remove('pulse');
            void secContainer.offsetWidth;
            secContainer.classList.add('pulse');
            setTimeout(() => secContainer.classList.remove('pulse'), 650);

            prevSeconds = newSeconds;
        }
    }
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Update bride and groom names
const brideInput = document.getElementById("brideName");
const groomInput = document.getElementById("groomName");
const brideDisplay = document.getElementById("brideName-display");
const groomDisplay = document.getElementById("groomName-display");

brideInput.addEventListener("change", () => {
    brideDisplay.innerText = brideInput.value || "Bride";
    if(brideDisplay){
        brideDisplay.classList.remove('name-animate'); void brideDisplay.offsetWidth;
        brideDisplay.classList.add('name-animate');
    }
});

groomInput.addEventListener("change", () => {
    groomDisplay.innerText = groomInput.value || "Groom";
    if(groomDisplay){
        groomDisplay.classList.remove('name-animate'); void groomDisplay.offsetWidth;
        groomDisplay.classList.add('name-animate');
    }
});

// Photo click animation
const bridePhoto = document.getElementById("bridePhoto");
const groomPhoto = document.getElementById("groomPhoto");

function createAnimation(photoElement){
    const animationDiv = photoElement.querySelector(".animation-container");
    animationDiv.classList.remove("active");
    // Trigger reflow to restart animation
    void animationDiv.offsetWidth;
    animationDiv.classList.add("active");
}

bridePhoto.addEventListener("click", () => {
    createAnimation(bridePhoto);
});

groomPhoto.addEventListener("click", () => {
    createAnimation(groomPhoto);
});

// Scroll progress bar and scroll-to-top button
const progressBar = document.getElementById('scrollProgress');
const scrollTopBtn = document.getElementById('scrollTopBtn');

function updateScrollProgress(){
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if(progressBar) progressBar.style.width = pct + '%';

    if(scrollTop > 300){
        if(scrollTopBtn) scrollTopBtn.classList.add('show');
    } else {
        if(scrollTopBtn) scrollTopBtn.classList.remove('show');
    }
}

window.addEventListener('scroll', updateScrollProgress);
window.addEventListener('resize', updateScrollProgress);
updateScrollProgress();

if(scrollTopBtn){
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Trigger invitation container entrance animation on load
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    if(container){
        // small delay so page paints first
        setTimeout(() => container.classList.add('enter'), 80);
        // allow re-play of entrance when container is clicked
        container.addEventListener('click', () => {
            container.classList.remove('enter');
            void container.offsetWidth;
            container.classList.add('enter');
        });
    }

    // Wrap h1 text for shimmer
    const h1 = document.querySelector('.container h1');
    if(h1 && !h1.classList.contains('shine-wrap')){
        const span = document.createElement('span');
        span.className = 'shine-wrap';
        span.innerHTML = h1.innerHTML;
        h1.innerHTML = '';
        h1.appendChild(span);
    }
    // initial name animation
    if(brideDisplay){
        brideDisplay.classList.add('name-animate');
    }
    if(groomDisplay){
        groomDisplay.classList.add('name-animate');
    }
});
