// Theme toggler
const themeToggleBtn = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const themeIcon = document.getElementById('themeIcon');

// Load theme preference from localStorage
const savedTheme = localStorage.getItem('theme') || 'light';

// Apply saved theme on page load
function initializeTheme() {
  const currentTheme = localStorage.getItem('theme') || 'light';
  applyTheme(currentTheme);
}

// Apply theme
function applyTheme(theme) {
  if (theme === 'dark') {
    htmlElement.setAttribute('data-theme', 'dark');
    if (themeIcon) themeIcon.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    htmlElement.setAttribute('data-theme', 'light');
    if (themeIcon) themeIcon.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
}

// Toggle theme on button click
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', function() {
    const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  });
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function() {
  initializeTheme();
});

// Also initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTheme);
} else {
  initializeTheme();
}
