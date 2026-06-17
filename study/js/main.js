(function () {
  "use strict";

  var body = document.body;
  var menuToggle = document.querySelector(".menu-toggle");
  var sidebar = document.querySelector(".sidebar");
  var backdrop = document.querySelector("[data-close-menu]");
  var backToTop = document.querySelector(".back-to-top");

  function openMenu() {
    body.classList.add("menu-open");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "true");
    }
  }

  function closeMenu() {
    body.classList.remove("menu-open");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }
  }

  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", function () {
      if (body.classList.contains("menu-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (backdrop) {
    backdrop.addEventListener("click", closeMenu);
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  document.querySelectorAll(".nav-link").forEach(function (link) {
    var currentPage = window.location.pathname.split("/").pop() || "index.html";
    var linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }

    link.addEventListener("click", function () {
      closeMenu();
    });
  });

  function fallbackCopy(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }

  document.querySelectorAll(".copy-button").forEach(function (button) {
    button.addEventListener("click", function () {
      var codeCard = button.closest(".code-card");
      var code = codeCard ? codeCard.querySelector("pre code") : null;

      if (!code) {
        return;
      }

      var text = code.textContent;
      var done = function () {
        var defaultText = button.textContent;
        button.textContent = "コピー済み";
        button.classList.add("is-copied");

        window.setTimeout(function () {
          button.textContent = defaultText;
          button.classList.remove("is-copied");
        }, 1800);
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done).catch(function () {
          fallbackCopy(text);
          done();
        });
      } else {
        fallbackCopy(text);
        done();
      }
    });
  });

  document.querySelectorAll(".answer-toggle").forEach(function (button) {
    var defaultLabel = button.textContent;

    button.addEventListener("click", function () {
      var targetId = button.getAttribute("data-target");
      var panel = document.getElementById(targetId);

      if (!panel) {
        return;
      }

      var willOpen = panel.hasAttribute("hidden");
      if (willOpen) {
        panel.removeAttribute("hidden");
        button.textContent = defaultLabel.indexOf("欄") !== -1 ? "答え欄を閉じる" : "答えを隠す";
        button.setAttribute("aria-expanded", "true");
      } else {
        panel.setAttribute("hidden", "");
        button.textContent = defaultLabel;
        button.setAttribute("aria-expanded", "false");
      }
    });
  });

  function updateBackToTop() {
    if (!backToTop) {
      return;
    }

    if (window.scrollY > 420) {
      backToTop.classList.add("is-visible");
    } else {
      backToTop.classList.remove("is-visible");
    }
  }

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

    window.addEventListener("scroll", updateBackToTop, { passive: true });
    updateBackToTop();
  }
})();
