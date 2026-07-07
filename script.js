// ==========================================
// IGBT WEBSITE - JAVASCRIPT COMPLET & OPTIMIZAT
// ==========================================

// -------------------------------------------
// Meniu Hamburger (Deschidere / Închidere)
// -------------------------------------------
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Închide meniul automat când se dă click pe un link (pentru mobil)
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// -------------------------------------------
// Efect Scroll pe Navbar
// -------------------------------------------
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        header.style.background = "rgba(255,255,255,.98)";
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.08)";
    } else {
        header.style.background = "rgba(255,255,255,.82)";
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,.05)";
    }
});

// -------------------------------------------
// Animație pentru Contoare (Statistici)
// -------------------------------------------
const counters = document.querySelectorAll(".counter");

const startCounters = () => {
    counters.forEach(counter => {
        const target = +counter.dataset.target;
        let count = 0;
        const speed = target / 100; // Viteza de numărare

        const updateCount = () => {
            if (count < target) {
                count += Math.ceil(speed);
                if (count > target) count = target;
                counter.innerText = count;
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
};

// ACTIVARE AUTOMATĂ A CONTOARELOR LA SCROLL
// Folosim un observer dedicat pentru a porni numărătoarea doar când secțiunea e vizibilă
const statsSection = document.querySelector(".stats");
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                observerInstance.unobserve(entry.target); // Oprim observarea ca să nu repete numărătoarea de fiecare dată
            }
        });
    }, { threshold: 0.1 });
    
    statsObserver.observe(statsSection);
}

// -------------------------------------------
// Buton Înapoi Sus (Back To Top)
// -------------------------------------------
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        topBtn.style.display = "block";
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

// -------------------------------------------
// Scroll Reveal (Animații la Scroll pentru elemente)
// -------------------------------------------
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
    threshold: 0.05 
});

hiddenElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(60px)";
    el.style.transition = ".8s ease-out";
    observer.observe(el);
});

// -------------------------------------------
// Link Activ în Meniu în funcție de Secțiune
// -------------------------------------------
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 150)) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(item => {
        item.classList.remove("active");
        if (item.getAttribute("href") === `#${current}`) {
            item.classList.add("active");
        }
    });
});