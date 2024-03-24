import '@main/window/windowPreload';

// Say something
console.log('[IM-Info] : Preload execution started');

// Get versions
window.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  const versions: Record<string, unknown> = {};
  // Set versions to app data
  app.setAttribute('data-versions', JSON.stringify(versions));
});
