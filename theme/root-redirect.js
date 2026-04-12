(function () {
  const path = window.location.pathname || "/";
  if (path === "/" || path === "/index.html") {
    window.location.replace("/about.html");
  }
})();
