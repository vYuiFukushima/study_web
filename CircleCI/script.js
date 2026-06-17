const navItems = document.querySelectorAll(".nav-item");
const projectCards = document.querySelectorAll(".project-card");
const seeAllProjectsButton = document.querySelector("#seeAllProjects");
const projects = document.querySelector("#projects");

document.body.classList.add("is-ready");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((navItem) => navItem.classList.remove("is-active"));
    item.classList.add("is-active");
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

seeAllProjectsButton.addEventListener("click", () => {
  projects.scrollIntoView({ behavior: "smooth", block: "nearest" });
  projectCards.forEach((card) => {
    card.animate(
      [
        { borderColor: "rgba(19, 83, 137, 0.72)" },
        { borderColor: "rgba(223, 229, 237, 1)" }
      ],
      { duration: 650, easing: "ease-out" }
    );
  });
});

function selectProject(selectedCard) {
  projectCards.forEach((card) => card.classList.toggle("is-selected", card === selectedCard));
}
