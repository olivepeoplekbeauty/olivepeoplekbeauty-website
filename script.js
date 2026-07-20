const menu = document.getElementById("menu");
const nav = document.getElementById("nav");
const langButton = document.getElementById("lang");
const year = document.getElementById("year");

if (menu && nav) {
  menu.setAttribute("aria-expanded", "false");

  menu.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(isOpen));
    menu.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menu.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-label", "Open menu");
    });
  });

  document.addEventListener("click", (event) => {
    if (!nav.classList.contains("open")) return;
    if (nav.contains(event.target) || menu.contains(event.target)) return;

    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "Open menu");
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 850) {
      nav.classList.remove("open");
      menu.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-label", "Open menu");
    }
  });
}

if (langButton) {
  let isArabic = document.documentElement.lang === "ar";

  langButton.addEventListener("click", () => {
    isArabic = !isArabic;

    document.documentElement.lang = isArabic ? "ar" : "en";
    document.documentElement.dir = isArabic ? "rtl" : "ltr";

    document.querySelectorAll("[data-en][data-ar]").forEach((element) => {
      element.textContent = isArabic
        ? element.dataset.ar
        : element.dataset.en;
    });

    langButton.textContent = isArabic ? "English" : "العربية";
    langButton.setAttribute(
      "aria-label",
      isArabic ? "Switch to English" : "التبديل إلى العربية"
    );
  });
}

if (year) {
  year.textContent = new Date().getFullYear();
}
