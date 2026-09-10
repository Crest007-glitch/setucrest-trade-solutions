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
const yearElement = document.querySelector('#year');
if (yearElement) yearElement.textContent = String(new Date().getFullYear());
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href]');
  if (!link || typeof window.gtag !== 'function') return;
  const href = link.getAttribute('href') || '';
  let eventName = '', method = '';
  if (href.includes('wa.me/')) { eventName = 'generate_lead'; method = 'whatsapp'; }
  else if (href.startsWith('mailto:')) { eventName = 'generate_lead'; method = 'email'; }
  else if (href.startsWith('tel:')) { eventName = 'generate_lead'; method = 'phone'; }
  else if (link.hasAttribute('download') && /\.txt$/.test(href)) { eventName = 'download_requirement_template'; method = 'requirement_template'; }
  else if (/india-sourcing-services|supplier-sourcing-india|small-quantity-sourcing-india|buyer-development-indian-manufacturers|delhi-ncr-sourcing-service|export-market-development/.test(href)) { eventName = 'select_content'; method = 'service_page'; }
  if (eventName) window.gtag('event', eventName, { method, link_url: link.href, link_text: (link.textContent || '').trim().slice(0, 100) });
});
