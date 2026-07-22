(() => {
  "use strict";

  const languageToggle = document.querySelector(".language-toggle");
  const shortcutLanguage = document.querySelector(".shortcut-language");
  const languageMenu = document.querySelector("#language-menu");
  const languageButtons = document.querySelectorAll("[data-language]");
  const cartCount = document.querySelector(".cart-count");

  const translations = {
    en: {
      pageTitle: "Our Story | OLIVE PEOPLE",
      description: "Discover the story, philosophy and vision of OLIVE PEOPLE — K Beauty & Lifestyle Market.",
      skip: "Skip to content",
      homeLabel: "OLIVE PEOPLE home",
      navLabel: "Primary navigation",
      home: "HOME",
      story: "OUR STORY",
      products: "PRODUCTS",
      contact: "CONTACT",
      language: "LANGUAGE",
      languageLabel: "Choose language",
      cartLabel: "Shopping cart",
      heroAlt: "OLIVE PEOPLE in Amman, Jordan",
      eyebrow: "OUR STORY",
      heroTitle: "Beauty connects people.",
      heroDescription: "From Korea to Jordan, OLIVE PEOPLE brings together trusted beauty, thoughtful selection and a warmer way to discover everyday life.",
      discover: "DISCOVER",
      discoverLabel: "Continue to our story",
      shortcutsLabel: "Page shortcuts",
      about: "ABOUT",
      sectionKicker: "FROM KOREA TO JORDAN",
      introTitle: "A place where beauty, people and culture meet.",
      introText: "OLIVE PEOPLE is a K-Beauty and lifestyle market created to make carefully selected Korean products easier to experience and trust. We believe beauty is more than a product: it is a shared language, a daily ritual and a way for people to feel closer."
    },
    ar: {
      pageTitle: "قصتنا | OLIVE PEOPLE",
      description: "اكتشفوا قصة OLIVE PEOPLE وفلسفتها ورؤيتها، سوق الجمال ونمط الحياة الكوري.",
      skip: "الانتقال إلى المحتوى",
      homeLabel: "الصفحة الرئيسية لـ OLIVE PEOPLE",
      navLabel: "التنقل الرئيسي",
      home: "الرئيسية",
      story: "قصتنا",
      products: "المنتجات",
      contact: "تواصل معنا",
      language: "اللغة",
      languageLabel: "اختيار اللغة",
      cartLabel: "سلة التسوق",
      heroAlt: "OLIVE PEOPLE في عمّان، الأردن",
      eyebrow: "قصتنا",
      heroTitle: "الجمال يجمع الناس.",
      heroDescription: "من كوريا إلى الأردن، تجمع OLIVE PEOPLE بين الجمال الموثوق والاختيار بعناية وطريقة أكثر دفئاً لاكتشاف تفاصيل الحياة اليومية.",
      discover: "اكتشفوا",
      discoverLabel: "تابعوا قراءة قصتنا",
      shortcutsLabel: "روابط الصفحة المختصرة",
      about: "من نحن",
      sectionKicker: "من كوريا إلى الأردن",
      introTitle: "مكان يلتقي فيه الجمال والناس والثقافة.",
      introText: "OLIVE PEOPLE هو سوق للجمال ونمط الحياة الكوري، أُنشئ ليجعل تجربة المنتجات الكورية المختارة بعناية والثقة بها أكثر سهولة. نؤمن بأن الجمال أكثر من مجرد منتج؛ فهو لغة مشتركة وطقس يومي وطريقة تقرّب الناس من بعضهم."
    }
  };

  function setText(selector, value) {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  }

  function setAttribute(selector, attribute, value) {
    const element = document.querySelector(selector);
    if (element) element.setAttribute(attribute, value);
  }

  function closeLanguageMenu() {
    if (!languageMenu || !languageToggle) return;
    languageMenu.hidden = true;
    languageToggle.setAttribute("aria-expanded", "false");
  }

  function openLanguageMenu() {
    if (!languageMenu || !languageToggle) return;
    languageMenu.hidden = false;
    languageToggle.setAttribute("aria-expanded", "true");
    languageMenu.querySelector("button")?.focus();
  }

  function toggleLanguageMenu() {
    if (!languageMenu) return;
    languageMenu.hidden ? openLanguageMenu() : closeLanguageMenu();
  }

  function applyLanguage(language) {
    const selected = translations[language] ? language : "en";
    const copy = translations[selected];
    const isArabic = selected === "ar";

    document.documentElement.lang = selected;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.title = copy.pageTitle;

    setAttribute('meta[name="description"]', "content", copy.description);
    setText(".skip-link", copy.skip);
    setAttribute(".brand", "aria-label", copy.homeLabel);
    setAttribute(".main-nav", "aria-label", copy.navLabel);
    setAttribute(".language-toggle", "aria-label", copy.languageLabel);
    setAttribute(".cart-link", "aria-label", copy.cartLabel);
    setAttribute(".hero-media img", "alt", copy.heroAlt);
    setAttribute(".scroll-cue", "aria-label", copy.discoverLabel);
    setAttribute(".story-shortcuts", "aria-label", copy.shortcutsLabel);
    setAttribute(".shortcut-language", "aria-label", copy.languageLabel);

    const navLinks = document.querySelectorAll(".main-nav a");
    if (navLinks[0]) navLinks[0].textContent = copy.home;
    if (navLinks[1]) navLinks[1].textContent = copy.story;
    if (navLinks[2]) navLinks[2].textContent = copy.products;
    if (navLinks[3]) navLinks[3].textContent = copy.contact;

    setText(".eyebrow", copy.eyebrow);
    setText("#story-title", copy.heroTitle);
    setText(".hero-description", copy.heroDescription);
    setText(".scroll-cue span", copy.discover);
    setText(".section-kicker", copy.sectionKicker);
    setText("#intro-title", copy.introTitle);
    setText(".story-intro-inner > p:last-child", copy.introText);

    const shortcutLabels = document.querySelectorAll(".story-shortcuts .shortcut-item > span:last-child");
    if (shortcutLabels[0]) shortcutLabels[0].textContent = copy.home;
    if (shortcutLabels[1]) shortcutLabels[1].textContent = copy.about;
    if (shortcutLabels[2]) shortcutLabels[2].textContent = copy.products;
    if (shortcutLabels[3]) shortcutLabels[3].textContent = copy.contact;
    if (shortcutLabels[4]) shortcutLabels[4].textContent = copy.language;

    languageButtons.forEach((button) => {
      const active = button.dataset.language === selected;
      button.setAttribute("aria-pressed", String(active));
    });

    try {
      localStorage.setItem("olivePeopleLanguage", selected);
    } catch (_) {
      // The page remains fully usable if browser storage is unavailable.
    }

    closeLanguageMenu();
  }

  function updateCartCount() {
    if (!cartCount) return;
    let count = 0;

    try {
      const savedCart = JSON.parse(localStorage.getItem("olivePeopleCart") || "[]");
      if (Array.isArray(savedCart)) {
        count = savedCart.reduce((total, item) => total + Math.max(0, Number(item?.quantity) || 0), 0);
      }
    } catch (_) {
      count = 0;
    }

    cartCount.textContent = String(count);
    cartCount.setAttribute("aria-label", `${count} ${count === 1 ? "item" : "items"}`);
  }

  languageToggle?.addEventListener("click", toggleLanguageMenu);
  shortcutLanguage?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.setTimeout(openLanguageMenu, 250);
  });

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.language));
  });

  document.addEventListener("click", (event) => {
    if (!languageMenu || languageMenu.hidden) return;
    if (!languageMenu.contains(event.target) && !languageToggle?.contains(event.target)) {
      closeLanguageMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLanguageMenu();
      languageToggle?.focus();
    }
  });

  let savedLanguage = "en";
  try {
    savedLanguage = localStorage.getItem("olivePeopleLanguage") || "en";
  } catch (_) {
    savedLanguage = "en";
  }

  applyLanguage(savedLanguage);
  updateCartCount();
  window.addEventListener("storage", updateCartCount);
})();
