(function () {
  var STORAGE_KEY = "portaldash-theme";
  var MODES = ["system", "light", "dark"];

  var LABELS = {
    system: "System theme",
    light: "Light theme",
    dark: "Dark theme",
  };

  function getStoredMode() {
    var stored = localStorage.getItem(STORAGE_KEY);
    return MODES.indexOf(stored) >= 0 ? stored : "system";
  }

  function applyTheme(mode) {
    document.documentElement.setAttribute("data-theme", mode);
    var btn = document.querySelector(".theme-toggle");
    if (btn) {
      updateToggleButton(btn, mode);
    }
  }

  function updateToggleButton(btn, mode) {
    btn.setAttribute("aria-label", LABELS[mode] + ". Click to change.");
    btn.setAttribute("title", LABELS[mode]);
    btn.setAttribute("data-theme-mode", mode);

    var systemIcon = btn.querySelector(".theme-toggle__icon--system");
    var lightIcon = btn.querySelector(".theme-toggle__icon--light");
    var darkIcon = btn.querySelector(".theme-toggle__icon--dark");

    if (systemIcon) systemIcon.hidden = mode !== "system";
    if (lightIcon) lightIcon.hidden = mode !== "light";
    if (darkIcon) darkIcon.hidden = mode !== "dark";
  }

  function cycleMode(current) {
    return MODES[(MODES.indexOf(current) + 1) % MODES.length];
  }

  function createToggleButton() {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-toggle";

    btn.innerHTML =
      '<svg class="theme-toggle__icon theme-toggle__icon--system" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<rect x="2" y="3" width="20" height="14" rx="2"/>' +
      '<path d="M8 21h8"/><path d="M12 17v4"/>' +
      "</svg>" +
      '<svg class="theme-toggle__icon theme-toggle__icon--light" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" hidden>' +
      '<circle cx="12" cy="12" r="4"/>' +
      '<path d="M12 2v2"/><path d="M12 20v2"/>' +
      '<path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/>' +
      '<path d="M2 12h2"/><path d="M20 12h2"/>' +
      '<path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>' +
      "</svg>" +
      '<svg class="theme-toggle__icon theme-toggle__icon--dark" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" hidden>' +
      '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>' +
      "</svg>";

    return btn;
  }

  function mountToggle() {
    var inner = document.querySelector(".site-header__inner");
    if (!inner || inner.querySelector(".theme-toggle")) {
      return;
    }

    var actions = inner.querySelector(".site-header__actions");
    if (!actions) {
      actions = document.createElement("div");
      actions.className = "site-header__actions";
      var nav = inner.querySelector(".site-nav");
      if (nav) {
        nav.parentNode.removeChild(nav);
        actions.appendChild(nav);
      }
      inner.appendChild(actions);
    }

    var btn = createToggleButton();
    updateToggleButton(btn, getStoredMode());
    btn.addEventListener("click", function () {
      var next = cycleMode(getStoredMode());
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
    });
    actions.appendChild(btn);
  }

  applyTheme(getStoredMode());

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
    if (getStoredMode() === "system") {
      applyTheme("system");
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountToggle);
  } else {
    mountToggle();
  }
})();
