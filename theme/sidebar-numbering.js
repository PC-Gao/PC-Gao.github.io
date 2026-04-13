(function () {
  function applyPageClasses() {
    const path = window.location.pathname || "";
    const body = document.body;
    if (!body) {
      return;
    }

    if (path.endsWith("/blog/cr-dr-issue-test-v2.html")) {
      body.classList.add("pcg-issue-test-page", "pcg-crdr-table-page");
    }

    if (path.endsWith("/blog/cr-dr-resolution-compare-v3.html")) {
      body.classList.add("pcg-resolution-compare-page", "pcg-crdr-table-page");
    }
  }

  function findSidebarLink(root, suffix) {
    const links = Array.from(root.querySelectorAll("a"));
    return (
      links.find((link) => {
        const attrHref = link.getAttribute("href") || "";
        const propHref = link.href || "";
        return attrHref.endsWith(suffix) || propHref.endsWith(suffix);
      }) || null
    );
  }

  function setSidebarLabel(root, hrefSuffix, text, options) {
    const link = findSidebarLink(root, hrefSuffix);
    const number = link?.querySelector("strong[aria-hidden='true']");
    if (!number) {
      return;
    }

    if (options?.hide) {
      number.textContent = "";
      number.style.display = "none";
      return;
    }

    number.style.display = "";
    number.textContent = text;
  }

  function patchSidebarLabels(root) {
    setSidebarLabel(root, "blog/ai-studio.html", "2026.4-");
    setSidebarLabel(root, "blog/image-demo-playground.html", "1.1");
    setSidebarLabel(root, "blog/ai-studio-architecture.html", "1.2");
    setSidebarLabel(root, "blog/cr-dr-segmentation-log.html", "2026.2-");
    setSidebarLabel(root, "blog/cr-dr-issue-test-v2.html", "1.1");
    setSidebarLabel(root, "blog/cr-dr-resolution-compare-v3.html", "1.2");
    setSidebarLabel(root, "blog/ppocrv5-ncnn-mobile-test.html", "2025.12-");
    setSidebarLabel(root, "projects/deamnet-ncnn-windows.html", "2025.11-");
    setSidebarLabel(root, "projects/raw-image-process.html", "2025.7-");
    setSidebarLabel(root, "projects/drunet-ncnn-windows.html", "2025.7-");
    setSidebarLabel(root, "projects/low-light-image-enhancement.html", "2025.7-");
  }

  const guidesDateLabels = {
    "blog/cr-dr-segmentation-log.html": "2026.2",
    "blog/ppocrv5-ncnn-mobile-test.html": "2025.12",
    "projects/deamnet-ncnn-windows.html": "2025.11",
    "projects/raw-image-process.html": "2025.7",
    "projects/drunet-ncnn-windows.html": "2025.7",
    "projects/low-light-image-enhancement.html": "2025.7",
  };

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
        if (!childLink || !childNumber) {
          return;
        }

        childIndex += 1;
        childNumber.style.display = "";

        const parentHref = topLink.getAttribute("href") || "";
        const childHref = childLink.getAttribute("href") || "";

        if (parentHref === "blog/index.html") {
          if (childHref === "blog/ai-studio.html") {
            childNumber.textContent = "";
            childNumber.style.display = "none";

            const nestedSection = child.querySelector(":scope > ol.section");
            if (!nestedSection) {
              return;
            }

            let grandChildIndex = 0;
            Array.from(nestedSection.children).forEach((grandChild) => {
              const grandChildLink = grandChild.querySelector(":scope > .chapter-link-wrapper > a");
              const grandChildNumber = grandChildLink?.querySelector("strong[aria-hidden='true']");
              if (!grandChildNumber) {
                return;
              }

              grandChildIndex += 1;
              grandChildNumber.style.display = "";
              grandChildNumber.textContent = "1." + grandChildIndex;
            });
            return;
          }

          if (childHref === "blog/cr-dr-segmentation-log.html") {
            childNumber.textContent = "2026.2-";
            return;
          }

          childNumber.textContent = guidesDateLabels[childHref] || String(childIndex);
          return;
        }

        const prefix = inPart ? topLevelIndex : 1;
        childNumber.textContent = prefix + "." + childIndex;
      });
    });
  }

  function run() {
    applyPageClasses();

    const scrollbox = document.querySelector("#mdbook-sidebar .sidebar-scrollbox");
    if (!scrollbox) {
      return;
    }

    renumberSidebar(scrollbox);
    patchSidebarLabels(scrollbox);
    applySidebarSectionLayout(scrollbox);

    const observer = new MutationObserver(function () {
      renumberSidebar(scrollbox);
      patchSidebarLabels(scrollbox);
      applySidebarSectionLayout(scrollbox);
    });

    observer.observe(scrollbox, {
      childList: true,
      subtree: true,
    });
  }

  document.addEventListener("DOMContentLoaded", run);
})();
