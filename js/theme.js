(function () {
  var STORAGE_KEY = "portaldash-theme";

  function getStoredMode() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      return stored;
    }
    return "system";
  }

  /** Resolved appearance for icon state (light | dark). */
  function effectiveTheme() {
    var mode = getStoredMode();
    if (mode === "light" || mode === "dark") {
      return mode;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(mode) {
    if (mode === "system") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", mode);
    }
    var btn = document.querySelector(".theme-toggle");
    if (btn) {
      updateToggleButton(btn);
    }
  }

  function updateToggleButton(btn) {
    var resolved = effectiveTheme();
    var isDark = resolved === "dark";

    btn.setAttribute("data-theme-mode", getStoredMode());
    btn.setAttribute(
      "aria-label",
      isDark ? "Switch to light theme" : "Switch to dark theme"
    );
    btn.setAttribute("title", isDark ? "Light mode" : "Dark mode");

    var sunIcon = btn.querySelector(".theme-toggle__icon--sun");
    var moonIcon = btn.querySelector(".theme-toggle__icon--moon");
    if (sunIcon) sunIcon.hidden = isDark;
    if (moonIcon) moonIcon.hidden = !isDark;
  }

  function createToggleButton() {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-toggle";

    btn.innerHTML =
      '<svg class="theme-toggle__icon theme-toggle__icon--sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<circle cx="12" cy="12" r="4"/>' +
      '<path d="M12 2v2"/><path d="M12 20v2"/>' +
      '<path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/>' +
      '<path d="M2 12h2"/><path d="M20 12h2"/>' +
      '<path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>' +
      "</svg>" +
      '<svg class="theme-toggle__icon theme-toggle__icon--moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" hidden>' +
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
    updateToggleButton(btn);
    btn.addEventListener("click", function () {
      var next = effectiveTheme() === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
    });
    actions.appendChild(btn);
  }

  (function init() {
    var stored = getStoredMode();
    if (stored === "light" || stored === "dark") {
      document.documentElement.setAttribute("data-theme", stored);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  })();

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
