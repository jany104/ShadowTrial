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
    # Check if server directory exists
    if (Test-Path "./server/index.js") {
        Start-Process cmd -ArgumentList "/c cd server && node index.js" -WindowStyle Minimized
        Start-Sleep -Seconds 2
    } else {
        Write-Host "⚠️  Backend server not found. Make sure /server directory exists with index.js" -ForegroundColor Red
    }
}

# 2. Start Frontend (Port 5173)
$frontendConn = Get-NetTCPConnection -LocalPort $frontendPort -ErrorAction SilentlyContinue
if ($frontendConn) {
    Write-Host "✅ Frontend is already running on port $frontendPort." -ForegroundColor Green
} else {
    Write-Host "🚀 Starting Frontend (UI)..." -ForegroundColor Yellow
    # Check if shadowtrial directory exists
    if (Test-Path "./shadowtrial/package.json") {
        Start-Process cmd -ArgumentList "/c cd shadowtrial && npm run dev" -WindowStyle Minimized
        Start-Sleep -Seconds 3
    } else {
        Write-Host "⚠️  Frontend directory not found. Make sure shadowtrial/package.json exists" -ForegroundColor Red
    }
}

# 3. Open Browser
Write-Host "🌐 Opening application..." -ForegroundColor Cyan
Start-Process $frontendUrl

Write-Host "Done! Minimizing launcher..." -ForegroundColor Gray
Start-Sleep -Seconds 2
