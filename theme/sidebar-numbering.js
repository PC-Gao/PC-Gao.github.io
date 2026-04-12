(function () {
  function applySidebarSectionLayout(root) {
    const chapter = root.querySelector("ol.chapter");
    if (!chapter) {
      return;
    }

    Array.from(chapter.querySelectorAll("li.chapter-item")).forEach((item) => {
      item.style.position = "";
      item.style.top = "";
      item.style.marginTop = "";
    });

    Array.from(chapter.querySelectorAll(".part-title")).forEach((partTitle) => {
      partTitle.style.display = "block";
      partTitle.style.marginTop = "2.2rem";
      partTitle.style.marginBottom = "0";
      partTitle.style.paddingBottom = "1.1rem";
      partTitle.style.lineHeight = "1.35";
      partTitle.style.fontWeight = "700";
      partTitle.style.borderBottom = "2px solid #7fd3d8";

      let cursor = partTitle.closest("li.chapter-item") || partTitle;
      let nextChapterItem = null;

      while (cursor && cursor.nextElementSibling) {
        cursor = cursor.nextElementSibling;
        if (
          cursor.matches("li.chapter-item") &&
          cursor.querySelector(":scope > .chapter-link-wrapper > a")
        ) {
          nextChapterItem = cursor;
          break;
        }
      }

      if (nextChapterItem) {
        nextChapterItem.style.marginTop = "0.6rem";
      }
    });
  }

  function renumberSidebar(root) {
    const chapter = root.querySelector("ol.chapter");
    if (!chapter) {
      return;
    }

    let inPart = false;
    let topLevelIndex = 0;
    let markNextChapterItem = false;

    Array.from(chapter.children).forEach((item) => {
      item.classList.remove("pcg-after-part-title");

      const partTitle = item.querySelector(":scope > .part-title");
      if (partTitle) {
        inPart = true;
        topLevelIndex = 0;
        markNextChapterItem = true;
        return;
      }

      const topLink = item.querySelector(":scope > .chapter-link-wrapper > a");
      if (!topLink) {
        return;
      }

      if (markNextChapterItem) {
        item.classList.add("pcg-after-part-title");
        markNextChapterItem = false;
      }

      const topNumber = topLink.querySelector("strong[aria-hidden='true']");
      if (inPart) {
        topLevelIndex += 1;
        if (topNumber) {
          topNumber.textContent = topLevelIndex + ".";
        }
      }

      const section = item.querySelector(":scope > ol.section");
      if (!section) {
        return;
      }

      let childIndex = 0;
      Array.from(section.children).forEach((child) => {
        const childLink = child.querySelector(":scope > .chapter-link-wrapper > a");
        const childNumber = childLink?.querySelector("strong[aria-hidden='true']");
        if (!childNumber) {
          return;
        }

        childIndex += 1;
        const prefix = inPart ? topLevelIndex : 1;
        childNumber.textContent = prefix + "." + childIndex + ".";
      });
    });
  }

  function run() {
    const scrollbox = document.querySelector("#mdbook-sidebar .sidebar-scrollbox");
    if (!scrollbox) {
      return;
    }

    renumberSidebar(scrollbox);
    applySidebarSectionLayout(scrollbox);

    const observer = new MutationObserver(function () {
      renumberSidebar(scrollbox);
      applySidebarSectionLayout(scrollbox);
    });

    observer.observe(scrollbox, {
      childList: true,
      subtree: true,
    });
  }

  document.addEventListener("DOMContentLoaded", run);
})();
