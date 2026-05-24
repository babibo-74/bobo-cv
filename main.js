(function () {
  'use strict';

  // ── Shared components (defined once, injected into every page) ──
  const NAV_HTML = `
<nav class="nav" style="position:relative">
  <div class="nav-inner">
    <a href="index.html" class="nav-brand">Wenbo XU</a>
    <div class="nav-links">
      <a href="index.html" class="nav-link" data-en="Home" data-zh="首页">Home</a>
      <a href="about.html" class="nav-link" data-en="About" data-zh="关于">About</a>
      <a href="projects.html" class="nav-link" data-en="Projects" data-zh="项目">Projects</a>
      <a href="resume.html" class="nav-link" data-en="Resume" data-zh="简历">Resume</a>
    </div>
    <div class="nav-right">
      <div class="lang-toggle">
        <button class="lang-btn" onclick="setLang('en')">EN</button>
        <button class="lang-btn" onclick="setLang('zh')">中文</button>
      </div>
      <button class="nav-hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
  <div class="nav-mobile">
    <a href="index.html" class="nav-link" data-en="Home" data-zh="首页">Home</a>
    <a href="about.html" class="nav-link" data-en="About" data-zh="关于">About</a>
    <a href="projects.html" class="nav-link" data-en="Projects" data-zh="项目">Projects</a>
    <a href="resume.html" class="nav-link" data-en="Resume" data-zh="简历">Resume</a>
  </div>
</nav>`;

  const FOOTER_HTML = `
<footer>
  <div class="footer-inner">
    <p class="footer-copy" data-en="© 2026 Wenbo XU" data-zh="© 2026 徐雯博">© 2026 Wenbo XU</p>
    <div class="footer-links">
      <a href="https://www.linkedin.com/in/wenbo74/" target="_blank" rel="noopener" class="footer-link">LinkedIn</a>
      <a href="https://www.instagram.com/wennnnboo" target="_blank" rel="noopener" class="footer-link">Instagram</a>
      <a href="mailto:boboxu74@gmail.com" class="footer-link">Email</a>
    </div>
  </div>
</footer>`;

  document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
  document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

  // ── Language toggle ──────────────────────────────────────
  function setLang(lang) {
    localStorage.setItem('preferred-lang', lang);
    applyLang(lang);
  }

  function applyLang(lang) {
    const isZh = lang === 'zh';
    document.documentElement.lang = isZh ? 'zh-CN' : 'en';

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active',
        (!isZh && btn.textContent.trim() === 'EN') ||
        (isZh && btn.textContent.trim() === '中文')
      );
    });

    document.querySelectorAll('[data-en]').forEach(el => {
      const val = isZh ? el.dataset.zh : el.dataset.en;
      if (val !== undefined) el.textContent = val;
    });
  }

  window.setLang = setLang;

  // ── Active nav link ──────────────────────────────────────
  function setActiveNav() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = (link.getAttribute('href') || '').split('#')[0];
      const isHome = (current === '' || current === 'index.html') && href === 'index.html';
      link.classList.toggle('active', href === current || isHome);
    });
  }

  // ── Scroll fade-in ───────────────────────────────────────
  function initFadeIn() {
    const items = document.querySelectorAll('.fade-in');
    if (!items.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    items.forEach(el => obs.observe(el));
  }

  // ── Mobile hamburger ─────────────────────────────────────
  function initHamburger() {
    const btn = document.querySelector('.nav-hamburger');
    const menu = document.querySelector('.nav-mobile');
    if (!btn || !menu) return;
    btn.addEventListener('click', () => menu.classList.toggle('open'));
    document.addEventListener('click', e => {
      if (!btn.contains(e.target) && !menu.contains(e.target)) menu.classList.remove('open');
    });
  }

  // ── Init ─────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem('preferred-lang') || 'en';
    applyLang(lang);
    setActiveNav();
    initFadeIn();
    initHamburger();
  });
})();
