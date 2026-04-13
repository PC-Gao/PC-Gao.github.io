param(
    [string]$AssetDir = "E:\PC-Gao.github.io\src\blog\cr-dr-assets",
    [string[]]$MarkdownFiles = @(
        "E:\PC-Gao.github.io\src\blog\cr-dr-issue-test-v2.md",
        "E:\PC-Gao.github.io\src\blog\cr-dr-resolution-compare-v3.md"
    ),
    [int]$Quality = 85
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$assetPath = [System.IO.Path]::GetFullPath($AssetDir)
$sourceFiles = Get-ChildItem -LiteralPath $assetPath -File | Where-Object {
    $_.Extension.ToLowerInvariant() -in @(".png", ".jpeg", ".jpg")
}

if (-not $sourceFiles) {
    Write-Output "No source images found."
    exit 0
}

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq "image/jpeg" } |
    Select-Object -First 1

if (-not $jpegCodec) {
    throw "JPEG codec not available."
}

$encoder = [System.Drawing.Imaging.Encoder]::Quality
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, [long]$Quality)

$nameMap = @{}
$beforeBytes = 0L
$afterBytes = 0L
$convertedCount = 0

foreach ($file in $sourceFiles) {
    $beforeBytes += $file.Length

    $targetName = "{0}.jpg" -f [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
    $targetPath = Join-Path $assetPath $targetName
    $tempPath = "{0}.tmp.jpg" -f [System.IO.Path]::Combine($assetPath, [System.IO.Path]::GetFileNameWithoutExtension($file.Name))

    $image = $null
    $bitmap = $null
    $graphics = $null

    try {
        $image = [System.Drawing.Image]::FromFile($file.FullName)
        $bitmap = New-Object System.Drawing.Bitmap($image.Width, $image.Height)
        $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
        $graphics.Clear([System.Drawing.Color]::White)
        $graphics.DrawImage($image, 0, 0, $image.Width, $image.Height)
        $bitmap.Save($tempPath, $jpegCodec, $encoderParams)
    }
    finally {
        if ($graphics) { $graphics.Dispose() }
        if ($bitmap) { $bitmap.Dispose() }
        if ($image) { $image.Dispose() }
    }

    if (Test-Path -LiteralPath $targetPath) {
        Remove-Item -LiteralPath $targetPath -Force
    }

    Move-Item -LiteralPath $tempPath -Destination $targetPath -Force
    $afterBytes += (Get-Item -LiteralPath $targetPath).Length
    $nameMap[$file.Name] = $targetName
    $convertedCount++
}

foreach ($markdownFile in $MarkdownFiles) {
    $content = Get-Content -LiteralPath $markdownFile -Raw

    foreach ($entry in $nameMap.GetEnumerator()) {
        $content = $content.Replace("./cr-dr-assets/$($entry.Key)", "./cr-dr-assets/$($entry.Value)")
    }

    Set-Content -LiteralPath $markdownFile -Value $content -Encoding utf8
}

foreach ($file in $sourceFiles) {
    if ($file.Extension.ToLowerInvariant() -ne ".jpg") {
        Remove-Item -LiteralPath $file.FullName -Force
    }
}

$beforeMb = [math]::Round($beforeBytes / 1MB, 2)
$afterMb = [math]::Round($afterBytes / 1MB, 2)

Write-Output ("Converted {0} images to JPG. Size: {1} MB -> {2} MB" -f $convertedCount, $beforeMb, $afterMb)
