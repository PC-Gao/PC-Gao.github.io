$docs = @(
  "src/blog/cr-dr-issue-test-v2.md",
  "src/blog/cr-dr-resolution-compare-v3.md"
)

$assetsDir = "src/blog/cr-dr-assets"
$urlPattern = '!\[[^\]]*\]\((https://[^)\s]+)\)'

New-Item -ItemType Directory -Path $assetsDir -Force | Out-Null

$allUrls = New-Object System.Collections.Generic.HashSet[string]

foreach ($doc in $docs) {
  $content = Get-Content -LiteralPath $doc -Raw -Encoding utf8
  $matches = [regex]::Matches($content, $urlPattern)
  foreach ($match in $matches) {
    $null = $allUrls.Add($match.Groups[1].Value)
  }
}

foreach ($url in $allUrls) {
  $uri = [uri]$url
  $fileName = [System.IO.Path]::GetFileName($uri.AbsolutePath)
  $targetPath = Join-Path $assetsDir $fileName

  if (-not (Test-Path -LiteralPath $targetPath)) {
    Invoke-WebRequest -Uri $url -OutFile $targetPath
  }
}

foreach ($doc in $docs) {
  $content = Get-Content -LiteralPath $doc -Raw -Encoding utf8
  $matches = [regex]::Matches($content, $urlPattern)
  $docUrls = $matches | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique

  foreach ($url in $docUrls) {
    $uri = [uri]$url
    $fileName = [System.IO.Path]::GetFileName($uri.AbsolutePath)
    $localPath = "./cr-dr-assets/$fileName"
    $content = $content.Replace($url, $localPath)
  }

  Set-Content -LiteralPath $doc -Value $content -Encoding utf8
}
