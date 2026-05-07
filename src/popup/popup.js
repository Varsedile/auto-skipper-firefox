document.addEventListener('DOMContentLoaded', () => {
  const enabledCheckbox = document.getElementById('enabled');
  const skipIntroCheckbox = document.getElementById('skipIntro');
  const skipRecapCheckbox = document.getElementById('skipRecap');
  const skipCreditsCheckbox = document.getElementById('skipCredits');

  const elements = {
    enabled: enabledCheckbox,
    skipIntro: skipIntroCheckbox,
    skipRecap: skipRecapCheckbox,
    skipCredits: skipCreditsCheckbox,
  };

  const defaultSettings = {
    enabled: true,
    skipIntro: true,
    skipRecap: true,
    skipCredits: true,
  };

  // Load saved state
  browser.storage.local.get(defaultSettings, (data) => {
    elements.enabled.checked = data.enabled;
    elements.skipIntro.checked = data.skipIntro;
    elements.skipRecap.checked = data.skipRecap;
    elements.skipCredits.checked = data.skipCredits;
  });

  // Save state on change
  Object.keys(elements).forEach((key) => {
    elements[key].addEventListener('change', () => {
      const settings = {
        enabled: elements.enabled.checked,
        skipIntro: elements.skipIntro.checked,
        skipRecap: elements.skipRecap.checked,
        skipCredits: elements.skipCredits.checked,
      };
      browser.storage.local.set(settings);
    });
  });

  document.getElementById('github-link').addEventListener('click', (e) => {
    e.preventDefault();
    browser.tabs.create({ url: 'https://github.com/Varsedile/auto-skipper-firefox' });
  });
});
