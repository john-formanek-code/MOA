(() => {
  const img    = document.getElementById('blaster');
  const scope  = document.getElementById('scope');
  const barrel = document.getElementById('barrel');

  // index: 0 základ, 1 barrel, 2 scope, 3 scope+barrel
  const IMGS = [
    'images/LongStrike.png',
    'images/LongStrikeWithBarrel.png',
    'images/LongStrikeWithScope.png',
    'images/LongStrikeWithScopeAndBarrel.png'
  ];

  // restore a preload
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
    localStorage.setItem('ls', JSON.stringify({ scope: scope.checked, barrel: barrel.checked }));
  }

  [scope, barrel].forEach(el => el.addEventListener('change', render));
  render();
})();
