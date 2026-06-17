const searchInput = document.querySelector("#projectSearch");
const projectRows = document.querySelectorAll(".project-row");
const noticeCard = document.querySelector(".notice-card");
const noticeClose = document.querySelector(".notice-close");

document.body.classList.add("is-ready");

searchInput?.addEventListener("input", () => {
  const keyword = searchInput.value.trim().toLowerCase();

  projectRows.forEach((row) => {
    const projectName = row.dataset.projectName.toLowerCase();
    row.hidden = keyword !== "" && !projectName.includes(keyword);
  });
});

projectRows.forEach((row) => {
  row.addEventListener("click", (event) => {
    if (event.target.closest("button, a")) {
      return;
    }

    projectRows.forEach((projectRow) => projectRow.classList.remove("is-highlighted"));
    row.classList.add("is-highlighted");
  });
});

noticeClose?.addEventListener("click", () => {
  noticeCard.animate(
    [
      { opacity: 1, transform: "translateY(0)" },
      { opacity: 0, transform: "translateY(-8px)" }
    ],
    { duration: 180, easing: "ease-out" }
  ).onfinish = () => {
    noticeCard.hidden = true;
  };
});
