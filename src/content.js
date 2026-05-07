let settings = {
  enabled: true,
  skipIntro: true,
  skipRecap: true,
  skipCredits: true,
};

let selector = '';

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
  if (window.location.href.includes("hotstar.com")) {
    if (settings.skipIntro) {
      var allButtons = document.getElementsByTagName(button);
      for(var i=0;i<mySpans.length;i++){
      if(mySpans[i].innerHTML == 'Skip Intro'){
      var parent = mySpans[i].parentNode;
      break;
      }}
      console.log(parent)
      parts.push('[class="_1CSTLo7uotP5mTlp3jKun7 relative overflow-hidden flex flex-row justify-center items-center RADIUS_03 py-SPACE_04 px-SPACE_05 px-SPACE_08 py-SPACE_04 rounded RADIUS_03 _1hvr__NMJbQHNb3s6iYa1w BODY2_MEDIUM TEXT_COLOR_L0"]');
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
  if (!settings.enabled || !selector) {
    return;
  }

  for (const mutation of mutations) {
    if (mutation.addedNodes.length) {
      const skipButton = document.querySelector(selector);
      if (skipButton) {
        skipButton.click();
        return;
      }
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
