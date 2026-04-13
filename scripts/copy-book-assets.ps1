$assetMappings = @(
  @{
    Source = "src/blog/ai-studio-assets"
    Target = "book/blog/ai-studio-assets"
  }
)

foreach ($mapping in $assetMappings) {
  if (-not (Test-Path -LiteralPath $mapping.Source)) {
    continue
  }

  New-Item -ItemType Directory -Force -Path $mapping.Target | Out-Null
  Get-ChildItem -LiteralPath $mapping.Source -Force | ForEach-Object {
    Copy-Item -LiteralPath $_.FullName -Destination $mapping.Target -Recurse -Force
  }
}
