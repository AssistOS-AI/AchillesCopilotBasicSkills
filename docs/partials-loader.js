async function loadPartial(container) {
  const response = await fetch(container.dataset.include);
  if (!response.ok) throw new Error(`Could not load partial ${container.dataset.include}`);
  container.innerHTML = await response.text();
}

window.addEventListener('DOMContentLoaded', async () => {
  await Promise.all(Array.from(document.querySelectorAll('[data-include]')).map(loadPartial));
});
