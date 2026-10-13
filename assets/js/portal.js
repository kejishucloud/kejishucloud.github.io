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
  // Zero-dependency, language-scoped full-text search. Text is never inserted as HTML.
  const form = document.getElementById('article-search');
  if (form) {
    const input = document.getElementById('search-query');
    const results = document.getElementById('search-results');
    const status = document.getElementById('search-status');
    const fallback = document.getElementById('search-fallback');
    const lang = form.dataset.lang;
    const descriptions = {
      zh: ['请输入关键词，或从下面选择文章。', '没有匹配结果。', '共找到'],
      en: ['Enter a query or browse the articles below.', 'No matching articles.', 'Results'],
      es: ['Introduce palabras clave o consulta los artículos.', 'No hay resultados.', 'Resultados'],
      ja: ['キーワードを入力するか、記事一覧をご覧ください。', '該当する記事はありません。', '検索結果']
    };
    const words = descriptions[lang] || descriptions.en;
    let entries = null;
    const load = async () => {
      if (entries) return entries;
      const response = await fetch(form.dataset.index, { cache: 'no-cache' });
      if (!response.ok) throw new Error('Search index unavailable');
      const payload = await response.json();
      if (!Array.isArray(payload)) throw new Error('Invalid search index');
      entries = payload.filter((entry) =>
        entry.lang === lang && typeof entry.title === 'string' &&
        typeof entry.url === 'string' && entry.url.startsWith('/'));
      return entries;
    };
    const node = (tag, value, className) => {
      const element = document.createElement(tag);
      if (className) element.className = className;
      element.textContent = value;
      return element;
    };
    const query = async () => {
      const term = input.value.trim().toLocaleLowerCase(lang).slice(0, 120);
      results.replaceChildren();
      if (!term) {
        status.textContent = words[0];
        fallback.hidden = false;
        return;
      }
      try {
        const data = await load();
        const terms = term.split(/\s+/u).filter(Boolean);
        const found = data.filter((entry) => {
          const content = [entry.title, entry.description, entry.topic, entry.text]
            .filter(Boolean).join(' ').toLocaleLowerCase(lang);
          return terms.every((word) => content.includes(word));
        }).slice(0, 40);
        fallback.hidden = true;
        status.textContent = found.length ? `${words[2]}: ${found.length}` : words[1];
        const fragment = document.createDocumentFragment();
        for (const entry of found) {
          const li = document.createElement('li');
          const link = document.createElement('a');
          link.href = entry.url;
          link.textContent = entry.title;
          li.append(link, node('p', entry.description || '', 'search-excerpt'),
            node('small', entry.date || '', 'search-meta'));
          fragment.append(li);
        }
        results.append(fragment);
      } catch {
        fallback.hidden = false;
        status.textContent = words[0];
      }
    };
    form.addEventListener('submit', (event) => { event.preventDefault(); void query(); });
    input.addEventListener('input', () => { void query(); });
    status.textContent = words[0];
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
          { type: 'LinearGradient', props: { colorA: '#e8efff', colorB: '#708fff' } }
        ]
      });
    } catch {
      mount.hidden = true;
    }
  }, { rootMargin: '80px' });
  observer.observe(mount);
})();
