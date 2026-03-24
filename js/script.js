/* =============================================
   ქაფი • cupy | coffee bar — Scripts
   ============================================= */

// ===== Language Switching =====
let currentLang = 'ka';

function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  document.querySelectorAll('[data-ka][data-en]').forEach(function (el) {
    el.textContent = el.getAttribute('data-' + lang);
  });
  document.documentElement.lang = lang === 'ka' ? 'ka' : 'en';
}

// ===== Mobile Menu =====
function toggleMobile() {
  var btn = document.getElementById('mBtn');
  var nav = document.getElementById('nI');
  btn.classList.toggle('open');
  nav.classList.toggle('open');
  document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
}

function closeMobile() {
  document.getElementById('mBtn').classList.remove('open');
  document.getElementById('nI').classList.remove('open');
  document.body.style.overflow = '';
}

// ===== Sticky Navbar on Scroll =====
var navbar = document.getElementById('nb');
window.addEventListener('scroll', function () {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ===== Scroll Reveal Animation =====
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('vis');
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.rv').forEach(function (el) {
  observer.observe(el);
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
