document.addEventListener('click', function (e) {
  var btn = e.target.closest('.read-more-btn');
  if (!btn) return;
  var wrap = btn.closest('.rank-body') || btn.parentElement;
  var more = wrap.querySelector('.more-text');
  if (!more) return;
  var expanded = more.classList.toggle('is-expanded');
  btn.textContent = expanded ? 'Ler menos' : 'Ler mais';
  btn.setAttribute('aria-expanded', String(expanded));
});
