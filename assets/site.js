const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');
menuButton?.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));
document.querySelector('#year').textContent = String(new Date().getFullYear());
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href]');
  if (!link || typeof window.gtag !== 'function') return;
  const href = link.getAttribute('href') || '';
  let eventName = '', method = '';
  if (href.includes('wa.me/')) { eventName = 'generate_lead'; method = 'whatsapp'; }
  else if (href.startsWith('mailto:')) { eventName = 'generate_lead'; method = 'email'; }
  else if (href.startsWith('tel:')) { eventName = 'generate_lead'; method = 'phone'; }
  else if (/india-sourcing-services|supplier-sourcing-india|small-quantity-sourcing-india/.test(href)) { eventName = 'select_content'; method = 'service_page'; }
  if (eventName) window.gtag('event', eventName, { method, link_url: link.href, link_text: (link.textContent || '').trim().slice(0, 100) });
});
