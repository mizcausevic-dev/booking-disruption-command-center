$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$screenshots = Join-Path $root "screenshots"
New-Item -ItemType Directory -Force -Path $screenshots | Out-Null

Add-Type -AssemblyName System.Drawing

function New-ProofImage {
    param(
        [string]$Path,
        [string]$Title,
        [string]$Subtitle,
        [string[]]$Bullets
    )

    $bitmap = New-Object System.Drawing.Bitmap 1600, 1000
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $graphics.Clear([System.Drawing.Color]::FromArgb(12, 17, 30))

    $panelBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(30, 24, 52))
    $accentBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(124, 228, 255))
    $textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(236, 243, 248))
    $mutedBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(156, 176, 191))
    $borderPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(72, 147, 181), 2)

    $graphics.FillRectangle($panelBrush, 48, 48, 1504, 904)
    $graphics.DrawRectangle($borderPen, 48, 48, 1504, 904)

    $eyebrowFont = New-Object System.Drawing.Font("Segoe UI", 16, [System.Drawing.FontStyle]::Bold)
    $titleFont = New-Object System.Drawing.Font("Georgia", 34, [System.Drawing.FontStyle]::Bold)
    $bodyFont = New-Object System.Drawing.Font("Segoe UI", 18)
    $bulletFont = New-Object System.Drawing.Font("Segoe UI", 20, [System.Drawing.FontStyle]::Bold)

    $graphics.DrawString("Booking Disruption Command Center", $eyebrowFont, $accentBrush, 92, 92)
    $graphics.DrawString($Title, $titleFont, $textBrush, 92, 142)
    $graphics.DrawString($Subtitle, $bodyFont, $mutedBrush, 92, 214)

    $y = 320
    foreach ($bullet in $Bullets) {
        $graphics.DrawString("•", $bulletFont, $accentBrush, 108, $y)
        $graphics.DrawString($bullet, $bodyFont, $textBrush, 138, $y + 2)
        $y += 82
    }

    $graphics.DrawString("Synthetic proof render for README packaging.", $bodyFont, $mutedBrush, 92, 880)
    $bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
    $graphics.Dispose()
    $bitmap.Dispose()
}

New-ProofImage -Path (Join-Path $screenshots "01-overview-proof.png") `
    -Title "Overview proof" `
    -Subtitle "Disruption queues, blocker evidence, and guest posture in one recovery-safe control surface." `
    -Bullets @(
        "Booking incidents map to concrete guest impact.",
        "Blocked recoveries stay visible before trust breaks.",
        "Guest posture is buyer-readable and operator-safe."
    )

New-ProofImage -Path (Join-Path $screenshots "02-deal-lane-proof.png") `
    -Title "Booking lane" `
    -Subtitle "Each disruption shows owner, guest impact, and next action." `
    -Bullets @(
        "Disruptions stay linked to guest-facing impact.",
        "Owners see the next recovery-safe move.",
        "High-risk incident drift surfaces early."
    )

New-ProofImage -Path (Join-Path $screenshots "03-obligation-risks-proof.png") `
    -Title "Recovery risks" `
    -Subtitle "Payment, inventory, and vendor blockers stay tied to required evidence." `
    -Bullets @(
        "Each blocker shows what proof is still missing.",
        "Impact areas stay visible for prioritization.",
        "Recovery work remains mapped to a named owner."
    )

New-ProofImage -Path (Join-Path $screenshots "04-launch-readiness-proof.png") `
    -Title "Guest communication" `
    -Subtitle "Recovery packets show confidence score, reply window, and service pressure." `
    -Bullets @(
        "Red packets show immediate guest-trust risk.",
        "Yellow packets preserve the next safe reply window.",
        "Green packets stay governed without noise."
    )
