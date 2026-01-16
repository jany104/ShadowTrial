$frontendPort = 5173
$backendPort = 3000
$frontendUrl = "http://localhost:$frontendPort"

Write-Host "ShadowTrial Launcher 🚀" -ForegroundColor Magenta
Write-Host "------------------------" -ForegroundColor Gray

# 1. Start Backend (Port 3000)
$backendConn = Get-NetTCPConnection -LocalPort $backendPort -ErrorAction SilentlyContinue
if ($backendConn) {
    Write-Host "✅ Backend is already running on port $backendPort." -ForegroundColor Green
} else {
    Write-Host "🚀 Starting Backend (Server)..." -ForegroundColor Yellow
    # Start node in server directory
    Start-Process cmd -ArgumentList "/c cd server && node index.js" -WindowStyle Minimized
    Start-Sleep -Seconds 2
}

# 2. Start Frontend (Port 5173)
$frontendConn = Get-NetTCPConnection -LocalPort $frontendPort -ErrorAction SilentlyContinue
if ($frontendConn) {
    Write-Host "✅ Frontend is already running on port $frontendPort." -ForegroundColor Green
} else {
    Write-Host "🚀 Starting Frontend (UI)..." -ForegroundColor Yellow
    Start-Process cmd -ArgumentList "/c npm run dev" -WindowStyle Minimized
    Start-Sleep -Seconds 3
}

# 3. Open Browser
Write-Host "🌐 Opening application..." -ForegroundColor Cyan
Start-Process $frontendUrl

Write-Host "Done! Minimizing launcher..." -ForegroundColor Gray
Start-Sleep -Seconds 2
