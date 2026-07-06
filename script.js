// ===========================
// IGBT WEBSITE
// script.js
// ===========================

// ---------------------------
// Hamburger Menu
// ---------------------------

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});

// ---------------------------
// Navbar Scroll Effect
// ---------------------------

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.style.background = "rgba(255,255,255,.98)";
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.08)";

    } else {

        header.style.background = "rgba(255,255,255,.92)";
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,.05)";

    }

});

// ---------------------------
// Counter Animation
// ---------------------------

const counters = document.querySelectorAll(".counter");

const startCounters = () => {

    counters.forEach(counter => {

        const target = +counter.dataset.target;

        let count = 0;

        const speed = target / 120;

        const update = () => {

            count += speed;

            if (count < target) {

                counter.innerText = Math.floor(count);

                requestAnimationFrame(update);

            } else {

                counter.innerText = target + "+";

            }

        };

        update();

    });

};

const stats = document.querySelector(".stats");

let counterStarted = false;

window.addEventListener("scroll", () => {

    if (!stats) return;

    const trigger = stats.offsetTop - window.innerHeight + 100;

    if (window.scrollY > trigger && !counterStarted) {

        startCounters();

        counterStarted = true;

    }

});

// ---------------------------
// Back To Top
// ---------------------------

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topBtn.style.display = "flex";

        topBtn.style.alignItems = "center";

        topBtn.style.justifyContent = "center";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

// ---------------------------
// Scroll Reveal
// ---------------------------

const hiddenElements = document.querySelectorAll(

    ".service-card, .project-card, .why-card, .step, .stat"

);

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

}, {

    threshold: 0.15

});

hiddenElements.forEach(el => {

    el.style.opacity = "0";
    el.style.transform = "translateY(60px)";
    el.style.transition = ".8s";

    observer.observe(el);

});

// ---------------------------
// Active Link
// ---------------------------

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});