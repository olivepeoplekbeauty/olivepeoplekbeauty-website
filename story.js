(() => {
  'use strict';
  const toggle = document.querySelector('.language');
  const menu = document.querySelector('.language-menu');
  if (!toggle || !menu) return;

  const close = () => {
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', (event) => {
    event.preventDefault();
    menu.hidden = !menu.hidden;
    toggle.setAttribute('aria-expanded', String(!menu.hidden));
  });

  menu.querySelectorAll('[data-lang]').forEach((button) => {
    button.addEventListener('click', () => {
      const language = button.dataset.lang === 'ar' ? 'ar' : 'en';
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      try { localStorage.setItem('olivePeopleLanguage', language); } catch (_) {}
      close();
    });
  });

  document.addEventListener('click', (event) => {
    if (!menu.hidden && !menu.contains(event.target) && event.target !== toggle) close();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });
})();
