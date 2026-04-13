$paths = @("book/toc.html")
$tocJs = Get-ChildItem -LiteralPath "book" -Filter "toc-*.js" -ErrorAction SilentlyContinue |
  Select-Object -First 1 -ExpandProperty FullName

if ($tocJs) {
  $paths += $tocJs
}

foreach ($path in $paths) {
  if (-not (Test-Path -LiteralPath $path)) {
    continue
  }

  $html = Get-Content -LiteralPath $path -Raw -Encoding UTF8

  $html = $html.Replace(
    '<a href="blog/ai-studio.html" target="_parent"><strong aria-hidden="true">2.1.</strong> AI Studio</a>',
    '<a href="blog/ai-studio.html" target="_parent"><strong aria-hidden="true"></strong> AI Studio</a>'
  )
  $html = $html.Replace(
    '<a href="blog/ai-studio.html"><strong aria-hidden="true">2.1.</strong> AI Studio</a>',
    '<a href="blog/ai-studio.html"><strong aria-hidden="true"></strong> AI Studio</a>'
  )

  $html = $html.Replace(
    '<a href="blog/image-demo-playground.html" target="_parent"><strong aria-hidden="true">2.1.1.</strong> Feature Overview（功能介绍）</a>',
    '<a href="blog/image-demo-playground.html" target="_parent"><strong aria-hidden="true">1.1</strong> Feature Overview（功能介绍）</a>'
  )
  $html = $html.Replace(
    '<a href="blog/image-demo-playground.html"><strong aria-hidden="true">2.1.1.</strong> Feature Overview（功能介绍）</a>',
    '<a href="blog/image-demo-playground.html"><strong aria-hidden="true">1.1</strong> Feature Overview（功能介绍）</a>'
  )

  $html = $html.Replace(
    '<a href="blog/ai-studio-architecture.html" target="_parent"><strong aria-hidden="true">2.1.2.</strong> Software Architecture（软件架构）</a>',
    '<a href="blog/ai-studio-architecture.html" target="_parent"><strong aria-hidden="true">1.2</strong> Software Architecture（软件架构）</a>'
  )
  $html = $html.Replace(
    '<a href="blog/ai-studio-architecture.html"><strong aria-hidden="true">2.1.2.</strong> Software Architecture（软件架构）</a>',
    '<a href="blog/ai-studio-architecture.html"><strong aria-hidden="true">1.2</strong> Software Architecture（软件架构）</a>'
  )

  $html = $html.Replace(
    '<a href="blog/cr-dr-segmentation-log.html" target="_parent"><strong aria-hidden="true">2.2.</strong> CR/DR 牙齿分割阶段记录</a>',
    '<a href="blog/cr-dr-segmentation-log.html" target="_parent"><strong aria-hidden="true">2026.4</strong> CR/DR 牙齿分割阶段记录</a>'
  )
  $html = $html.Replace(
    '<a href="blog/cr-dr-segmentation-log.html"><strong aria-hidden="true">2.2.</strong> CR/DR 牙齿分割阶段记录</a>',
    '<a href="blog/cr-dr-segmentation-log.html"><strong aria-hidden="true">2026.4</strong> CR/DR 牙齿分割阶段记录</a>'
  )

  $html = $html.Replace(
    '<a href="blog/ppocrv5-ncnn-mobile-test.html" target="_parent"><strong aria-hidden="true">2.3.</strong> PPOCRv5-ncnn 移动端速度测试</a>',
    '<a href="blog/ppocrv5-ncnn-mobile-test.html" target="_parent"><strong aria-hidden="true">2025.12</strong> PPOCRv5-ncnn 移动端速度测试</a>'
  )
  $html = $html.Replace(
    '<a href="blog/ppocrv5-ncnn-mobile-test.html"><strong aria-hidden="true">2.3.</strong> PPOCRv5-ncnn 移动端速度测试</a>',
    '<a href="blog/ppocrv5-ncnn-mobile-test.html"><strong aria-hidden="true">2025.12</strong> PPOCRv5-ncnn 移动端速度测试</a>'
  )

  $html = $html.Replace(
    '<a href="projects/deamnet-ncnn-windows.html" target="_parent"><strong aria-hidden="true">2.4.</strong> DeamNet ncnn Windows</a>',
    '<a href="projects/deamnet-ncnn-windows.html" target="_parent"><strong aria-hidden="true">2025.11</strong> DeamNet ncnn Windows</a>'
  )
  $html = $html.Replace(
    '<a href="projects/deamnet-ncnn-windows.html"><strong aria-hidden="true">2.4.</strong> DeamNet ncnn Windows</a>',
    '<a href="projects/deamnet-ncnn-windows.html"><strong aria-hidden="true">2025.11</strong> DeamNet ncnn Windows</a>'
  )

  $html = $html.Replace(
    '<a href="projects/raw-image-process.html" target="_parent"><strong aria-hidden="true">2.5.</strong> Raw Image Process</a>',
    '<a href="projects/raw-image-process.html" target="_parent"><strong aria-hidden="true">2025.7</strong> Raw Image Process</a>'
  )
  $html = $html.Replace(
    '<a href="projects/raw-image-process.html"><strong aria-hidden="true">2.5.</strong> Raw Image Process</a>',
    '<a href="projects/raw-image-process.html"><strong aria-hidden="true">2025.7</strong> Raw Image Process</a>'
  )

  $html = $html.Replace(
    '<a href="projects/drunet-ncnn-windows.html" target="_parent"><strong aria-hidden="true">2.6.</strong> DruNet ncnn Windows</a>',
    '<a href="projects/drunet-ncnn-windows.html" target="_parent"><strong aria-hidden="true">2025.7</strong> DruNet ncnn Windows</a>'
  )
  $html = $html.Replace(
    '<a href="projects/drunet-ncnn-windows.html"><strong aria-hidden="true">2.6.</strong> DruNet ncnn Windows</a>',
    '<a href="projects/drunet-ncnn-windows.html"><strong aria-hidden="true">2025.7</strong> DruNet ncnn Windows</a>'
  )

  $html = $html.Replace(
    '<a href="projects/low-light-image-enhancement.html" target="_parent"><strong aria-hidden="true">2.7.</strong> Low Light Image Enhancement</a>',
    '<a href="projects/low-light-image-enhancement.html" target="_parent"><strong aria-hidden="true">2025.7</strong> Low Light Image Enhancement</a>'
  )
  $html = $html.Replace(
    '<a href="projects/low-light-image-enhancement.html"><strong aria-hidden="true">2.7.</strong> Low Light Image Enhancement</a>',
    '<a href="projects/low-light-image-enhancement.html"><strong aria-hidden="true">2025.7</strong> Low Light Image Enhancement</a>'
  )

  Set-Content -LiteralPath $path -Value $html -Encoding UTF8
}
