const searchInput = document.querySelector("#searchInput");
const chapters = Array.from(document.querySelectorAll(".chapter"));
const tocLinks = Array.from(document.querySelectorAll(".toc__link"));
const emptyState = document.querySelector("#emptyState");
const toggleCodeButton = document.querySelector("#toggleCodeButton");
const backToTopButton = document.querySelector("#backToTop");

document.querySelectorAll(".code-panel").forEach((panel) => {
  const code = panel.querySelector("code");
  const copyButton = document.createElement("button");
  copyButton.className = "copy-button";
  copyButton.type = "button";
  copyButton.textContent = "コピー";

  copyButton.addEventListener("click", async () => {
    try {
      await copyText(code.innerText);
      copyButton.textContent = "完了";
    } catch {
      copyButton.textContent = "失敗";
    }

    window.setTimeout(() => {
      copyButton.textContent = "コピー";
    }, 1400);
  });

  panel.append(copyButton);
});

const copyText = async (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.inset = "0 auto auto 0";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();

  const copied = document.execCommand("copy");
  textarea.remove();

  if (!copied) {
    throw new Error("Copy command failed");
  }
};

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  chapters.forEach((chapter) => {
    const isMatch = !keyword || chapter.textContent.toLowerCase().includes(keyword);
    chapter.hidden = !isMatch;
    if (isMatch) visibleCount += 1;
  });

  emptyState.hidden = visibleCount !== 0;
});

toggleCodeButton.addEventListener("click", () => {
  const collapsed = document.body.classList.toggle("code-collapsed");
  toggleCodeButton.textContent = collapsed ? "コードを表示" : "コードを折りたたむ";
});

const setActiveLink = (id) => {
  tocLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    const visibleEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visibleEntry) {
      setActiveLink(visibleEntry.target.id);
    }
  },
  {
    rootMargin: "-20% 0px -65% 0px",
    threshold: [0.1, 0.3, 0.6],
  }
);

chapters.forEach((chapter) => observer.observe(chapter));

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  backToTopButton.classList.toggle("is-visible", window.scrollY > 420);
});
