(() => {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const menuButton = document.getElementById("menu");
  const navigation = document.getElementById("nav");
  const languageButton = document.getElementById("lang");
  const year = document.getElementById("year");

  const closeMenu = () => {
    if (!menuButton || !navigation) return;
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
    body.classList.remove("menu-open");
  };

  const openMenu = () => {
    if (!menuButton || !navigation) return;
    navigation.classList.add("open");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close menu");
    body.classList.add("menu-open");
  };

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      if (!navigation.classList.contains("open")) return;
      if (navigation.contains(event.target) || menuButton.contains(event.target)) return;
      closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  const setText = (element, value) => {
    const lines = value.split("|");

    if (lines.length === 1) {
      element.textContent = value;
      return;
    }

    element.replaceChildren();
    lines.forEach((line) => {
      const span = document.createElement("span");
      span.textContent = line;
      element.appendChild(span);
    });
  };

  const applyLanguage = (language) => {
    const isArabic = language === "ar";

    root.lang = isArabic ? "ar" : "en";
    root.dir = isArabic ? "rtl" : "ltr";

    document.querySelectorAll("[data-en][data-ar]").forEach((element) => {
      setText(element, isArabic ? element.dataset.ar : element.dataset.en);
    });

    if (languageButton) {
      languageButton.textContent = isArabic ? "English" : "العربية";
      languageButton.setAttribute(
        "aria-label",
        isArabic ? "Switch to English" : "التبديل إلى العربية"
      );
    }

    try {
      localStorage.setItem("olive-people-language", isArabic ? "ar" : "en");
    } catch (_) {
      /* The page still works when browser storage is unavailable. */
    }
  };

  let currentLanguage = "en";

  try {
    const savedLanguage = localStorage.getItem("olive-people-language");
    if (savedLanguage === "ar" || savedLanguage === "en") {
      currentLanguage = savedLanguage;
    }
  } catch (_) {
    currentLanguage = root.lang === "ar" ? "ar" : "en";
  }

  applyLanguage(currentLanguage);

  if (languageButton) {
    languageButton.addEventListener("click", () => {
      currentLanguage = root.lang === "ar" ? "en" : "ar";
      applyLanguage(currentLanguage);
      closeMenu();
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href").slice(1);
      const target = targetId ? document.getElementById(targetId) : null;
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      if (history.pushState) {
        history.pushState(null, "", `#${targetId}`);
      }
    });
  });

  const categoryCards = document.querySelectorAll(".category-card");

  categoryCards.forEach((card) => {
    card.addEventListener("click", () => {
      categoryCards.forEach((item) => item.classList.remove("selected"));
      card.classList.add("selected");
    });
  });

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const revealElements = document.querySelectorAll(
    ".trust-strip article, .story-copy, .mission-grid article, .brands-section > *, .category-grid .category-card, .store-image, .store-copy, .contact-section > *"
  );

  revealElements.forEach((element) => element.classList.add("reveal-item"));
  body.classList.add("reveal-ready");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.13, rootMargin: "0px 0px -6% 0px" }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }

  window.addEventListener("load", () => body.classList.add("page-ready"), { once: true });
})();
