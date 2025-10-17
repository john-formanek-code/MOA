(() => {
  const img    = document.getElementById('blaster');
  const scope  = document.getElementById('scope');
  const barrel = document.getElementById('barrel');

  // 0 base, 1 barrel, 2 scope, 3 scope+barrel (cesty ponechány!)
  const IMGS = [
    'images/LongStrike.png',
    'images/LongStrikeWithBarrel.png',
    'images/LongStrikeWithScope.png',
    'images/LongStrikeWithScopeAndBarrel.png'
  ];

  // restore + preload
  const saved = JSON.parse(localStorage.getItem('ls') || '{}');
  scope.checked  = !!saved.scope;
  barrel.checked = !!saved.barrel;
  IMGS.forEach(src => (new Image()).src = src);

  function render() {
    const idx  = (scope.checked ? 2 : 0) | (barrel.checked ? 1 : 0);
    const next = IMGS[idx];

    if (img.getAttribute('src') !== next) {
      img.style.opacity = '0.001';
      requestAnimationFrame(() => {
        img.src = next;
        if (img.complete) requestAnimationFrame(() => (img.style.opacity = '1'));
        else img.onload = () => (img.style.opacity = '1');
      });
    }
    localStorage.setItem('ls', JSON.stringify({
      scope: scope.checked, barrel: barrel.checked
    }));
  }

  [scope, barrel].forEach(el => el.addEventListener('change', render));
  render();

  // Service worker registrace 
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js', { scope: './' }).catch(console.error);
    });
  }
})();
