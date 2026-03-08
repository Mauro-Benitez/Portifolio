// Sistema de Tradução Multiidioma
let currentLanguage = localStorage.getItem('language') || 'pt';
let translations = {};

// Carregar traduções
async function loadTranslations() {
  try {
    const response = await fetch('./translations.json');
    translations = await response.json();
    applyTranslations();
    updateCurrentLanguage();
  } catch (error) {
    console.error('Erro ao carregar traduções:', error);
  }
}

// Aplicar traduções ao DOM
function applyTranslations() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach((element) => {
    const key = element.getAttribute('data-i18n');
    const placeholder = element.getAttribute('data-i18n-placeholder');
    
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
      if (placeholder) {
        element.placeholder = translations[currentLanguage][key];
      } else {
        element.textContent = translations[currentLanguage][key];
      }
    }
  });
}

// Trocar idioma
function changeLanguage(lang) {
  if (translations[lang]) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    applyTranslations();
    updateCurrentLanguage();
  }
}

// Atualizar exibição do idioma atual no dropdown
function updateCurrentLanguage() {
  const langMap = { pt: 'PT', en: 'EN', es: 'ES' };
  const currentLangSpan = document.getElementById('currentLang');
  if (currentLangSpan) {
    currentLangSpan.textContent = langMap[currentLanguage] || 'PT';
  }
  
  const langItems = document.querySelectorAll('.header__lang-item');
  langItems.forEach((item) => {
    item.classList.remove('active');
    if (item.getAttribute('data-lang') === currentLanguage) {
      item.classList.add('active');
    }
  });
}

// Inicializar ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  loadTranslations();
});

// Expor função globalmente
window.changeLanguage = changeLanguage;
window.toggleLanguageMenu = function() {
  const menu = document.getElementById('languageMenu');
  if (menu) {
    menu.classList.toggle('active');
  }
};
