(() => {
  const pageTopButtons = document.querySelectorAll(".page-top-button");

  if (!pageTopButtons.length) {
    return;
  }

  const updateVisibility = () => {
    const shouldShow = window.scrollY > 320;
    pageTopButtons.forEach((button) => {
      button.classList.toggle("is-visible", shouldShow);
    });
  };

  pageTopButtons.forEach((button) => {
    button.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  });

  window.addEventListener("scroll", updateVisibility, { passive: true });
  updateVisibility();
})();
