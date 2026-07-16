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
        const speed = target / 100;

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
// Scroll Reveal (Animații ușoare la scroll)
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

// --------------------------------------------------------------------------
// Sistem Avansat de Filtrare Portofoliu (DOUĂ CATEGORII) + Load More
// --------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    const projectGrid = document.querySelector(".projects-grid");
    const filterBtns = document.querySelectorAll(".filter-btn");
    
    if (projectGrid) {
        const allProjects = Array.from(projectGrid.children);
        let currentFilter = "all";
        let isExpanded = false;

        const applyFilterAndLimit = () => {
            let visibleCount = 0;
            
            allProjects.forEach((proj) => {
                const cat = proj.getAttribute("data-category");
                
                if (currentFilter === "all") {
                    if (isExpanded || visibleCount < 6) {
                        proj.style.display = "block";
                        visibleCount++;
                    } else {
                        proj.style.display = "none";
                    }
                } else {
                    if (cat === currentFilter) {
                        proj.style.display = "block";
                    } else {
                        proj.style.display = "none";
                    }
                }
            });

            if (currentFilter === "all") {
                loadMoreBtn.style.display = "block";
                loadMoreBtn.innerText = isExpanded ? "Ascunde proiectele" : "Vezi mai multe proiecte";
            } else {
                loadMoreBtn.style.display = "none";
            }
        };

        applyFilterAndLimit();

        filterBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                filterBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                currentFilter = btn.getAttribute("data-filter");
                applyFilterAndLimit();
            });
        });

        if (loadMoreBtn) {
            loadMoreBtn.addEventListener("click", (e) => {
                e.preventDefault();
                isExpanded = !isExpanded;
                applyFilterAndLimit();
                
                if (!isExpanded) {
                    const projectsSection = document.getElementById("proiecte");
                    if (projectsSection) projectsSection.scrollIntoView({ behavior: "smooth" });
                }
            });
        }

        document.querySelectorAll(".about-link").forEach(link => {
            link.addEventListener("click", () => {
                const href = link.getAttribute("href");
                if (href === "#proiect-instalatie") {
                    const targetBtn = document.querySelector('.filter-btn[data-filter="electric"]');
                    if (targetBtn) targetBtn.click();
                } else if (href === "#proiect-fotovoltaic") {
                    const targetBtn = document.querySelector('.filter-btn[data-filter="solar"]');
                    if (targetBtn) targetBtn.click();
                }
            });
        });
    }
});