const progressBar = document.querySelector(".scroll-progress");
const pageTopButton = document.querySelector(".page-top");

const updateScrollState = () => {
  const scrollTop = window.scrollY;
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;

  progressBar.style.width = `${progress}%`;
  pageTopButton.dataset.show = String(scrollTop > 360);
};

pageTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

window.addEventListener("scroll", updateScrollState, { passive: true });
window.addEventListener("resize", updateScrollState);
updateScrollState();
