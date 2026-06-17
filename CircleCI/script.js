const dashboardFrame = document.querySelector("#dashboardFrame");
const navItems = document.querySelectorAll(".nav-item");
const targetButtons = document.querySelectorAll("[data-target]");
const projectCards = document.querySelectorAll(".project-card");
const observedSections = document.querySelectorAll("[data-nav-section]");

document.body.classList.add("is-ready");

targetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.target;
    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveNav(targetId);
  });
});

projectCards.forEach((card) => {
  card.addEventListener("click", () => selectProject(card));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectProject(card);
    }
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) {
        setActiveNav(visible.target.id);
      }
    },
    {
      root: dashboardFrame,
      threshold: [0.25, 0.5, 0.75]
    }
  );

  observedSections.forEach((section) => observer.observe(section));
}

function setActiveNav(targetId) {
  const navId = getNavId(targetId);

  navItems.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.target === navId);
  });
}

function getNavId(targetId) {
  if (targetId === "overview" || targetId === "pipelines") {
    return "pipelines";
  }

  if (targetId === "insights" || targetId === "people" || targetId === "plan") {
    return "insights";
  }

  return targetId;
}

function selectProject(selectedCard) {
  projectCards.forEach((card) => {
    card.classList.toggle("is-selected", card === selectedCard);
  });
}
