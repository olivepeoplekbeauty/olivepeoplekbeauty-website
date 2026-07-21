/*====================================
OLIVE PEOPLE
story.js
====================================*/

// Header Scroll Effect
const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {
        header.style.background = "rgba(34,34,34,.92)";
        header.style.backdropFilter = "blur(18px)";
    } else {
        header.style.background = "rgba(0,0,0,.15)";
        header.style.backdropFilter = "blur(14px)";
    }

});

// Fade Up Animation
const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.15

});

document.querySelectorAll(".fade-up").forEach(el => {

    observer.observe(el);

});

// Smooth Anchor Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth"

        });

    });

});

// Language Dropdown
const langBtn = document.querySelector(".language-btn");
const langMenu = document.querySelector(".language-menu");

if (langBtn && langMenu) {

    langBtn.addEventListener("click", (e) => {

        e.stopPropagation();

        langMenu.classList.toggle("open");

    });

    document.addEventListener("click", () => {

        langMenu.classList.remove("open");

    });

}

// Hero Fade
window.addEventListener("scroll", () => {

    const hero = document.querySelector(".hero-content");

    if (!hero) return;

    const y = window.scrollY;

    hero.style.transform = `translateY(${y * 0.25}px)`;

    hero.style.opacity = 1 - y / 700;

});

// Active Navigation
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".main-nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 120;

        if (window.scrollY >= top) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === "#" + current) {

            link.classList.add("active");

        }

    });

});

// Image Hover Effect
document.querySelectorAll(".experience-card img").forEach(img => {

    img.addEventListener("mousemove", (e) => {

        const rect = img.getBoundingClientRect();

        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;

        img.style.transform = `scale(1.08) rotateX(${-y}deg) rotateY(${x}deg)`;

    });

    img.addEventListener("mouseleave", () => {

        img.style.transform = "scale(1) rotateX(0) rotateY(0)";

    });

});

console.log("OLIVE PEOPLE Story Loaded");
