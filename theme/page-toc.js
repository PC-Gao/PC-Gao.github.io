(function () {
  function createPageTocContainer(content) {
    const existing = content.querySelector(".sidetoc");
    if (existing) {
      return existing.querySelector(".pagetoc");
    }

    const sideToc = document.createElement("div");
    sideToc.className = "sidetoc";

    const pageToc = document.createElement("nav");
    pageToc.className = "pagetoc";

    sideToc.appendChild(pageToc);
    content.insertBefore(sideToc, content.querySelector("main"));
    return pageToc;
  }

  function collectHeaders(main) {
    return Array.from(main.querySelectorAll(".header")).filter((headerLink) => {
      const parent = headerLink.parentElement;
      return parent && /^H[2-4]$/.test(parent.tagName) && headerLink.href;
    });
  }

  function indentFor(tagName) {
    if (tagName === "H3") {
      return "20px";
    }
    if (tagName === "H4") {
      return "40px";
    }
    return "0";
  }

  function updateActive(headers, tocLinks) {
    let current = null;

    headers.forEach((headerLink) => {
      if (window.pageYOffset >= headerLink.offsetTop) {
        current = headerLink;
      }
    });

    tocLinks.forEach((link) => {
      link.classList.remove("active");
      if (current && current.href === link.href) {
        link.classList.add("active");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    const content = document.getElementById("mdbook-content");
    const main = content?.querySelector("main");
    if (!content || !main) {
      return;
    }

    const headers = collectHeaders(main);
    if (headers.length === 0) {
      return;
    }

    const pageToc = createPageTocContainer(content);

    headers.forEach((headerLink) => {
      const link = document.createElement("a");
      link.href = headerLink.href;
      link.textContent = headerLink.textContent;
      link.style.paddingLeft = indentFor(headerLink.parentElement.tagName);
      pageToc.appendChild(link);
    });

    const tocLinks = Array.from(pageToc.querySelectorAll("a"));

    tocLinks.forEach((link) => {
      link.addEventListener("click", function () {
        tocLinks.forEach((item) => item.classList.remove("active"));
        link.classList.add("active");
      });
    });

    const onScroll = function () {
      updateActive(headers, tocLinks);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  });
})();
