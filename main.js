(() => {
  'use strict';
  const video = document.getElementById('flow-video');
  const toggle = document.getElementById('video-toggle');
  const setVideoState = () => { if (toggle && video) { toggle.innerHTML = video.paused ? 'Play <span aria-hidden="true">▶</span>' : 'Pause <span aria-hidden="true">Ⅱ</span>'; toggle.setAttribute('aria-label', video.paused ? 'Play animation' : 'Pause animation'); }};
  if (video) {
    video.play().catch(() => { setVideoState(); });
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {video.pause();}
    setVideoState();
    toggle?.addEventListener('click', () => { if (video.paused) video.play().catch(()=>{}); else video.pause(); setVideoState(); });
  }
  const dialog = document.getElementById('figure-dialog');
  const full = document.getElementById('expanded-figure');
  document.querySelectorAll('[data-full]').forEach(button => button.addEventListener('click', () => {
    full.src = button.dataset.full;
    document.getElementById('full-res-link').href = button.dataset.full;
    full.alt = button.dataset.alt || 'Expanded scientific figure';
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else window.open(button.dataset.full, '_blank', 'noopener');
  }));
  document.getElementById('close-figure')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog?.addEventListener('close', () => full.removeAttribute('src'));
  const copyButton = document.getElementById('copy-bibtex');
  copyButton?.addEventListener('click', async () => {
    const bibtex = document.getElementById('bibtex').textContent;
    try {
      await navigator.clipboard.writeText(bibtex);
      copyButton.textContent = 'Copied ✓';
      window.setTimeout(() => { copyButton.textContent = 'Copy BibTeX ⧉'; }, 1700);
    } catch (_) { const range = document.createRange(); range.selectNodeContents(document.getElementById('bibtex')); const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range); }
  });
})();
