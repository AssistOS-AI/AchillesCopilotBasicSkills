async function loadPartial(container) {
  const source = container.dataset.include;
  if (!source) {
    return;
  }

  const response = await fetch(source);
  if (!response.ok) {
    throw new Error(`Could not load partial ${source}`);
  }

  container.innerHTML = await response.text();
}

window.addEventListener('DOMContentLoaded', async () => {
  const containers = Array.from(document.querySelectorAll('[data-include]'));
  await Promise.all(containers.map(loadPartial));
});
