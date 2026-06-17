const progressBar = document.querySelector(".scroll-progress");
const pageTopButton = document.querySelector(".page-top");

const buildPageToc = () => {
  const pageShell = document.querySelector(".page-shell");

  if (!pageShell || pageShell.querySelector(".home-grid") || pageShell.querySelector(".content-layout")) {
    return;
  }

  const pageHeader = pageShell.querySelector(":scope > .page-header");
  const headings = Array.from(pageShell.querySelectorAll(".content-section > .section-heading h2[id]"));

  if (!pageHeader || headings.length === 0) {
    return;
  }

  const layout = document.createElement("div");
  layout.className = "content-layout";

  const toc = document.createElement("aside");
  toc.className = "page-toc";
  toc.setAttribute("aria-label", "ページ内ナビゲーション");

  const tocTitle = document.createElement("p");
  tocTitle.className = "page-toc__title";
  tocTitle.textContent = "ページ内目次";

  const tocList = document.createElement("nav");
  tocList.className = "page-toc__links";

  headings.forEach((heading, index) => {
    const link = document.createElement("a");
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent.trim();

    if (index === 0) {
      link.setAttribute("aria-current", "true");
    }

    tocList.appendChild(link);
  });

  const contentMain = document.createElement("div");
  contentMain.className = "content-main";

  toc.append(tocTitle, tocList);
  layout.append(toc, contentMain);
  pageHeader.after(layout);

  while (layout.nextSibling) {
    contentMain.appendChild(layout.nextSibling);
  }

  const tocLinks = Array.from(tocList.querySelectorAll("a"));
  const setCurrentTocLink = () => {
    let currentIndex = 0;

    headings.forEach((heading, index) => {
      if (heading.getBoundingClientRect().top <= 170) {
        currentIndex = index;
      }
    });

    tocLinks.forEach((link, index) => {
      if (index === currentIndex) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  window.addEventListener("scroll", setCurrentTocLink, { passive: true });
  window.addEventListener("resize", setCurrentTocLink);
  setCurrentTocLink();
};

const updateScrollState = () => {
  const scrollTop = window.scrollY;
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;

  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }

  if (pageTopButton) {
    pageTopButton.dataset.show = String(scrollTop > 360);
  }
};

if (pageTopButton) {
  pageTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

window.addEventListener("scroll", updateScrollState, { passive: true });
window.addEventListener("resize", updateScrollState);
buildPageToc();
updateScrollState();
