$redirectHtml = @"
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <title>Redirecting to About...</title>
    <meta http-equiv="refresh" content="0; url=about.html">
    <link rel="canonical" href="about.html">
    <script>
      window.location.replace("about.html");
    </script>
  </head>
  <body>
    <p>Redirecting to <a href="about.html">about.html</a>...</p>
  </body>
</html>
"@

Set-Content -LiteralPath "book/index.html" -Value $redirectHtml -Encoding UTF8
