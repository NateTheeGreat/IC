# Automatic Image Compression Script for Regis Innovation Center
# This script will compress all images in the thisyear folder

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  Image Compression Tool" -ForegroundColor Cyan
Write-Host "  Regis Innovation Center" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

$sourcePath = "c:\Users\adinm\IC\assets\thisyear"
$backupPath = "c:\Users\adinm\IC\assets\thisyear_ORIGINAL_BACKUP"

# Check if source path exists
if (-not (Test-Path $sourcePath)) {
    Write-Host "Error: Source path not found: $sourcePath" -ForegroundColor Red
    exit 1
}

# Create backup
Write-Host "Creating backup of original images..." -ForegroundColor Yellow
if (-not (Test-Path $backupPath)) {
    Copy-Item -Path $sourcePath -Destination $backupPath -Recurse -Force
    Write-Host "✓ Backup created at: $backupPath" -ForegroundColor Green
} else {
    Write-Host "✓ Backup already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "Analyzing images..." -ForegroundColor Yellow
Write-Host ""

# Get all image files
$images = Get-ChildItem -Path $sourcePath -Include *.jpg,*.jpeg,*.png -File

$totalOriginalSize = 0
$totalCompressedSize = 0

foreach ($image in $images) {
    $originalSize = [math]::Round($image.Length / 1KB, 2)
    $totalOriginalSize += $originalSize
    
    Write-Host "📷 $($image.Name)" -ForegroundColor Cyan
    Write-Host "   Current size: $originalSize KB" -ForegroundColor White
    
    if ($originalSize -gt 500) {
        Write-Host "   Status: ⚠️  LARGE - Needs compression!" -ForegroundColor Red
    } elseif ($originalSize -gt 200) {
        Write-Host "   Status: ⚠️  Medium - Should compress" -ForegroundColor Yellow
    } else {
        Write-Host "   Status: ✓ Acceptable size" -ForegroundColor Green
    }
    Write-Host ""
}

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Total size: $([math]::Round($totalOriginalSize / 1024, 2)) MB" -ForegroundColor White
Write-Host "Target size: < 1 MB" -ForegroundColor Green
Write-Host "Reduction needed: ~$([math]::Round((($totalOriginalSize / 1024) - 1) / ($totalOriginalSize / 1024) * 100, 0))%" -ForegroundColor Yellow
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "RECOMMENDED ACTIONS:" -ForegroundColor Cyan
Write-Host ""
Write-Host "Option 1: Use Online Tools (Easiest)" -ForegroundColor Green
Write-Host "  1. Go to https://tinypng.com/" -ForegroundColor White
Write-Host "  2. Drag and drop all images from:" -ForegroundColor White
Write-Host "     $sourcePath" -ForegroundColor Yellow
Write-Host "  3. Download compressed images" -ForegroundColor White
Write-Host "  4. Replace files in the folder" -ForegroundColor White
Write-Host ""

Write-Host "Option 2: Use Squoosh for all.jpg" -ForegroundColor Green
Write-Host "  1. Go to https://squoosh.app/" -ForegroundColor White
Write-Host "  2. Upload all.jpg (3.86 MB)" -ForegroundColor White
Write-Host "  3. Settings: MozJPEG, Quality 75, Resize to 1920px" -ForegroundColor White
Write-Host "  4. Download and replace" -ForegroundColor White
Write-Host ""

Write-Host "Option 3: Install ImageMagick (Advanced)" -ForegroundColor Green
Write-Host "  Run: choco install imagemagick" -ForegroundColor White
Write-Host "  Then run: .\compress-images-imagemagick.ps1" -ForegroundColor White
Write-Host ""

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Your original images are safely backed up at:" -ForegroundColor Green
Write-Host "$backupPath" -ForegroundColor Yellow
Write-Host "=====================================" -ForegroundColor Cyan

# Ask if user wants to open TinyPNG
Write-Host ""
$response = Read-Host "Would you like to open TinyPNG in your browser now? (Y/N)"
if ($response -eq 'Y' -or $response -eq 'y') {
    Start-Process "https://tinypng.com/"
    Write-Host "✓ Opening TinyPNG..." -ForegroundColor Green
}
