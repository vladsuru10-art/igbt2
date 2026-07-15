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
const statsSection = document.querySelector(".stats");
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                observerInstance.unobserve(entry.target); 
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

// -------------------------------------------
// Sistem de „Încarcă mai multe” (Varianta Corectată & Sigură)
// -------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    const projectGrid = document.querySelector(".projects-grid");
    
    if (loadMoreBtn && projectGrid) {
        // Obținem toate elementele direct din grila de proiecte
        const allProjects = Array.from(projectGrid.children);
        
        // Dacă în grilă sunt mai puțin de sau fix 6 poze, ascundem butonul de tot
        if (allProjects.length <= 6) {
            loadMoreBtn.style.display = "none";
            return;
        }

        // Ascundem automat la început tot ce depășește primele 6 imagini
        allProjects.forEach((proj, index) => {
            if (index >= 6) {
                proj.style.display = "none";
            }
        });

        let isExpanded = false;

        loadMoreBtn.addEventListener("click", (e) => {
            e.preventDefault(); // Prevenim orice comportament ciudat de reîncărcare a paginii
            
            if (!isExpanded) {
                // Afișăm toate pozele din grilă
                allProjects.forEach(proj => {
                    proj.style.display = "block";
                    proj.style.opacity = "1";
                    proj.style.transform = "translateY(0)";
                });
                
                loadMoreBtn.innerText = "Ascunde proiectele";
                isExpanded = true;
            } else {
                // Ascundem din nou pozele care depășesc numărul de 6
                allProjects.forEach((proj, index) => {
                    if (index >= 6) {
                        proj.style.display = "none";
                    }
                });
                
                // Trimiterea lină a ecranului înapoi sus la secțiunea proiecte
                const projectsSection = document.getElementById("proiecte");
                if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: "smooth" });
                }
                
                loadMoreBtn.innerText = "Vezi mai multe proiecte";
                isExpanded = false;
            }
        });
    }
});