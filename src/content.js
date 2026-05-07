let settings = {
  enabled: true,
  skipIntro: true,
  skipRecap: true,
  skipCredits: true,
};

let selector = '';

function findUsingXpath(xpath) {
  return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function buildSelector() {
  const parts = [];
  if (window.location.href.includes("netflix.com")) {
    if (settings.skipIntro) {
      parts.push('[data-uia="player-skip-intro"]');
    }
    if (settings.skipRecap) {
      parts.push('[data-uia="player-skip-recap"]');
    }
    if (settings.skipCredits) {
      parts.push('.skip-credits a', '.watch-video--skip-content-button');
    }
  }
  selector = parts.join(', ');
}

browser.storage.local.get(settings, (data) => {
  settings = data;
  buildSelector();
});

browser.storage.onChanged.addListener(() => {
  browser.storage.local.get(settings, (data) => {
    settings = data;
    buildSelector();
  });
});

const observer = new MutationObserver((mutations) => {
  if (!settings.enabled || (!selector && !window.location.href.includes("hotstar.com"))) {
    return;
  }
  for (const mutation of mutations) {
    if (mutation.addedNodes.length) {
      if (selector) {
        const skipButton = document.querySelector(selector);
        if (skipButton) {
          skipButton.click();
          return;
        }}
      if (window.location.href.includes("hotstar.com")) {
        if (settings.skipIntro) {
          var findButton = findUsingXpath("//text()[contains(.,'Skip Intro')]/ancestor::*[self::button][1]")
          if (findButton) {
            findButton.click()
        }}
        if (settings.skipRecap) {
          var findButton = findUsingXpath("//text()[contains(.,'Skip Recap')]/ancestor::*[self::button][1]")
          if (findButton) {
            findButton.click()
        }}
      }
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
