(function () {
  const GISCUS_ORIGIN = "https://giscus.app";
  const GISCUS_THEME_MAP = {
    light: "light",
    rust: "light",
    default_theme: "light",
    coal: "dark",
    navy: "dark",
    ayu: "dark",
  };

  function currentMdBookTheme() {
    const theme =
      localStorage.getItem("mdbook-theme") ||
      document.documentElement.className ||
      "light";
    return theme.trim().split(/\s+/)[0];
  }

  function currentGiscusTheme() {
    return GISCUS_THEME_MAP[currentMdBookTheme()] || "light";
  }

  function insertComments(main) {
    if (!main || main.querySelector(".pcg-comments")) {
      return null;
    }

    const comments = document.createElement("section");
    comments.className = "pcg-comments";
    comments.setAttribute("aria-label", "评论区");

    const title = document.createElement("h2");
    title.textContent = "评论";
    comments.appendChild(title);

    const shell = document.createElement("div");
    shell.className = "pcg-comments__body";
    comments.appendChild(shell);

    const script = document.createElement("script");
    script.src = GISCUS_ORIGIN + "/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", "PC-Gao/PC-Gao.github.io");
    script.setAttribute("data-repo-id", "R_kgDOO4K2sA");
    script.setAttribute("data-category", "Announcements");
    script.setAttribute("data-category-id", "DIC_kwDOO4K2sM4CrMpk");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-lang", "zh-CN");
    script.setAttribute("data-loading", "lazy");
    script.setAttribute("data-theme", currentGiscusTheme());
    shell.appendChild(script);

    main.appendChild(comments);
    return comments;
  }

  function syncGiscusTheme() {
    const iframe = document.querySelector("iframe.giscus-frame");
    if (!iframe) {
      return;
    }

    iframe.contentWindow.postMessage(
      {
        giscus: {
          setConfig: {
            theme: currentGiscusTheme(),
          },
        },
      },
      GISCUS_ORIGIN
    );
  }

  document.addEventListener("DOMContentLoaded", function () {
    const main = document.querySelector("#mdbook-content > main");
    if (!main) {
      return;
    }
    insertComments(main);

    const observer = new MutationObserver(function () {
      syncGiscusTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("message", function (event) {
      if (event.origin === GISCUS_ORIGIN) {
        syncGiscusTheme();
      }
    });
  });
})();
