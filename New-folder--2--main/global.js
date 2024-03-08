const TOOL_OVERLAY_ID = 'tool-overlay';
const SETTINGS_ICON_ID = 'settings-icon';
const CODE_BOX_ID = 'code-box';
const MINIMIZE_BUTTON_CLASS = 'minimize';

function toggleToolOverlay() {
  const toolOverlay = document.getElementById(TOOL_OVERLAY_ID);
  const settingsIcon = document.getElementById(SETTINGS_ICON_ID);

  const isToolOverlayVisible = toolOverlay.style.display !== 'none';

  toolOverlay.style.display = isToolOverlayVisible ? 'none' : 'block';
  settingsIcon.style.display = isToolOverlayVisible ? 'block' : 'none';
}

function handleMessage(event) {
  if (event.source === document.querySelector('object').contentWindow && event.data === 'minimize') {
    toggleToolOverlay();
  }
}

function initializeEventListeners() {
  const settingsIcon = document.getElementById(SETTINGS_ICON_ID);
  const minimizeButton = document.querySelector('.' + MINIMIZE_BUTTON_CLASS);

  if (settingsIcon) {
    settingsIcon.addEventListener('click', () => {
      if (typeof toggleCodeVisibility === 'function') {
        toggleCodeVisibility();
      }
      toggleToolOverlay();
    });
  }

  if (minimizeButton) {
    minimizeButton.addEventListener('click', () => {
      toggleToolOverlay();
    });
  }
}

function initializeApp() {
  const currentUrl = window.location.href;
  const settingsIcon = document.getElementById(SETTINGS_ICON_ID);

  if (currentUrl.includes('tool=true')) {
    settingsIcon.classList.toggle('settings-icon-visibility');
  }

  window.addEventListener('message', handleMessage);

  initializeEventListeners();
}

document.addEventListener('DOMContentLoaded', initializeApp);
