const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  toggle.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus();
  }
});

// Native dialog provides Escape handling and keeps keyboard focus in the preview.
const previewDialog = document.querySelector('.app-dialog');
document.querySelectorAll('[data-preview]').forEach(button => {
  button.addEventListener('click', () => {
    previewDialog.showModal();
    document.body.classList.add('preview-open');
  });
});
function closePreview() {
  previewDialog.close();
}
previewDialog.querySelector('.dialog-close').addEventListener('click', closePreview);
previewDialog.querySelector('[data-close-preview]').addEventListener('click', closePreview);
previewDialog.addEventListener('close', () => document.body.classList.remove('preview-open'));
previewDialog.addEventListener('click', event => {
  const bounds = previewDialog.getBoundingClientRect();
  if (event.target === previewDialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) closePreview();
});

// Accessible feature tabs: click, arrow keys, Home and End all select a panel.
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectFeature(selected, focus = false) {
  tabs.forEach(tab => {
    const active = tab === selected;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
  });
  if (focus) selected.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectFeature(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectFeature(tabs[next], true); }
  });
});
const horizontalTabs = window.matchMedia('(max-width: 900px)');
function syncTabOrientation() {
  document.querySelector('[role="tablist"]').setAttribute('aria-orientation', horizontalTabs.matches ? 'horizontal' : 'vertical');
}
syncTabOrientation();
horizontalTabs.addEventListener('change', syncTabOrientation);

if ('IntersectionObserver' in window) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!reducedMotion.matches) entry.target.classList.add('reveal-in');
        reveal.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.section-heading, .platform-card, .features-grid article, .explorer-shell, .steps, .download-panel').forEach(element => reveal.observe(element));

  const sections = [...document.querySelectorAll('#platform, #features, #faq')];
  const activeSections = new Set();
  const navigationObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting ? activeSections.add(entry.target.id) : activeSections.delete(entry.target.id));
    const current = sections.find(section => activeSections.has(section.id));
    nav.querySelectorAll('a').forEach(link => {
      const active = current && link.getAttribute('href') === `#${current.id}`;
      link.classList.toggle('is-active', Boolean(active));
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-15% 0px -40% 0px' });
  sections.forEach(section => navigationObserver.observe(section));
}
