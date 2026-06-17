const tabButtons = document.querySelectorAll(".tab-button");
const tableRows = document.querySelectorAll("tbody tr");
const betaSwitch = document.querySelector(".switch");
const triggerButton = document.querySelector(".trigger-button");
const triggerSection = document.querySelector("#trigger-pipeline");
const pipelineListTitle = document.querySelector("#pipeline-list-title");
const pipelineListDescription = document.querySelector("#pipeline-list-description");

document.body.classList.add("is-ready");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tabButtons.forEach((tabButton) => tabButton.classList.remove("is-active"));
    button.classList.add("is-active");
  });
});

tableRows.forEach((row) => {
  row.addEventListener("click", () => {
    tableRows.forEach((tableRow) => tableRow.classList.remove("is-selected"));
    row.classList.add("is-selected");
  });
});

betaSwitch?.addEventListener("click", () => {
  const isOn = betaSwitch.classList.toggle("is-on");
  betaSwitch.setAttribute("aria-pressed", String(isOn));
});

triggerButton?.addEventListener("click", () => {
  triggerButton.animate(
    [
      { transform: "translateY(0)" },
      { transform: "translateY(-2px)" },
      { transform: "translateY(0)" }
    ],
    { duration: 260, easing: "ease-out" }
  );

  triggerSection?.scrollIntoView({ behavior: "smooth", block: "start" });
});

pipelineListTitle?.addEventListener("click", scrollToPipelineListDescription);
pipelineListTitle?.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    scrollToPipelineListDescription();
  }
});

function scrollToPipelineListDescription() {
  pipelineListDescription?.scrollIntoView({ behavior: "smooth", block: "start" });
}
