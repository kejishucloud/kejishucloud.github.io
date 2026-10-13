/**
 * KeJiShuCloud progressive enhancements.
 * No core navigation or content relies on JavaScript.
 */
(() => {
  document.documentElement.classList.add('js');
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.getElementById('main-nav');
  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(expanded));
      navigation.classList.toggle('open', expanded);
    });
    navigation.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        navigation.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
  }
  const languages = document.getElementById('language-picker');
  if (languages) {
    languages.addEventListener('change', () => {
      const target = languages.value;
      if (target && target.startsWith('/')) window.location.assign(target);
    });
  }
  const mount = document.querySelector('[data-shader-root]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!mount || !('gpu' in navigator) || reducedMotion.matches || !('IntersectionObserver' in window)) return;
  // MIT open-source Shaders JS WebGPU engine, version-pinned.
  // A visible CSS gradient serves as fallback when WebGPU/CDN is unavailable.
  const observer = new IntersectionObserver(async (entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    observer.disconnect();
    try {
      const { createShader } = await import('https://esm.sh/shaders@4.0.3/js');
      await createShader(mount, {
        components: [
          { type: 'LinearGradient', props: { colorA: '#143a30', colorB: '#8caa61' } }
        ]
      });
    } catch {
      mount.hidden = true;
    }
  }, { rootMargin: '80px' });
  observer.observe(mount);
})();
