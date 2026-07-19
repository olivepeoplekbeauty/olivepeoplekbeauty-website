const languageButton = document.getElementById('languageButton');
const menuButton = document.getElementById('menuButton');
const siteNav = document.getElementById('siteNav');
const year = document.getElementById('year');

year.textContent = new Date().getFullYear();

let currentLanguage = localStorage.getItem('olivepeople-language') || 'en';

function applyLanguage(language) {
  const isArabic = language === 'ar';
  document.documentElement.lang = language;
  document.documentElement.dir = isArabic ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-en][data-ar]').forEach((element) => {
    element.textContent = element.dataset[language];
  });

  languageButton.textContent = isArabic ? 'English' : 'العربية';
  languageButton.setAttribute(
    'aria-label',
    isArabic ? 'Switch website to English' : 'تحويل الموقع إلى العربية'
  );

  localStorage.setItem('olivepeople-language', language);
}

languageButton.addEventListener('click', () => {
  currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
  applyLanguage(currentLanguage);
});

menuButton.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

applyLanguage(currentLanguage);
