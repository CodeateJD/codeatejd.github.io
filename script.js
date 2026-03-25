// ══════════ TYPING ANIMATION ══════════
const phrases = {
  es: [
    'Desarrollo web elegante y a tu medida',
    'Apps móviles con Flutter',
    'Infraestructura que no falla',
    'Tu idea, hecha realidad',
    'Código limpio, resultados sólidos',
  ],
  en: [
    'Elegant custom web development',
    'Mobile apps with Flutter',
    'Infrastructure that never fails',
    'Your idea, made real',
    'Clean code, solid results',
  ],
};

let currentLang = 'es';
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typingText');

function typeEffect() {
  const list = phrases[currentLang];
  const current = list[phraseIndex % list.length];

  if (!isDeleting) {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
    setTimeout(typeEffect, 50);
  } else {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex++;
      setTimeout(typeEffect, 400);
      return;
    }
    setTimeout(typeEffect, 30);
  }
}
typeEffect();

// ══════════ SCROLL REVEAL ══════════
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 }
);
reveals.forEach((el) => observer.observe(el));

// ══════════ NAV SCROLL ══════════
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ══════════ MOBILE MENU ══════════
const menuBtn = document.getElementById('navMenu');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = menuBtn.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});
mobileMenu.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = menuBtn.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  })
);

// ══════════ LANGUAGE TOGGLE ══════════
const langBtn = document.getElementById('langToggle');
langBtn.addEventListener('click', () => {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  langBtn.textContent = currentLang === 'es' ? 'EN' : 'ES';
  document.documentElement.setAttribute('data-lang', currentLang);

  // Update all translatable elements
  document.querySelectorAll('[data-es]').forEach((el) => {
    el.textContent = el.getAttribute(`data-${currentLang}`);
  });

  // Reset typing animation with new language
  phraseIndex = 0;
  charIndex = 0;
  isDeleting = false;
  typingEl.textContent = '';
});

// ══════════ SMOOTH SCROLL ══════════
document.querySelectorAll('a[href^="#"]').forEach((a) =>
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  })
);

// ══════════ PARALLAX CODE FLOATS ══════════
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelectorAll('.code-float').forEach((el, i) => {
    const speed = 0.3 + i * 0.1;
    el.style.transform = `translateY(${scrollY * speed * -0.15}px)`;
  });
});
