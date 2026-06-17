const tabButtons = document.querySelectorAll(".tab-button");
const tableRows = document.querySelectorAll("tbody tr");
const betaSwitch = document.querySelector(".switch");
const triggerButton = document.querySelector(".trigger-button");

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
});
