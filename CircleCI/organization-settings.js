const settingsButtons = document.querySelectorAll(".settings-menu__item");
const settingsSections = document.querySelectorAll("[data-settings-section]");
const dashboardFrame = document.querySelector(".dashboard-frame");

document.body.classList.add("is-ready");

settingsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.target);

    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSetting(button.dataset.target);
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) {
        setActiveSetting(visible.target.id);
      }
    },
    {
      root: dashboardFrame,
      threshold: [0.35, 0.6]
    }
  );

  settingsSections.forEach((section) => observer.observe(section));
}

function setActiveSetting(targetId) {
  settingsButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.target === targetId);
  });
}
