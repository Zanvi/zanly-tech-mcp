$ErrorActionPreference = "Stop"

Write-Host "=== Zanly Tech MCP - Inicialização Automática ===" -ForegroundColor Cyan

$ngrokRunning = Get-Process -Name "ngrok" -ErrorAction SilentlyContinue

if ($ngrokRunning) {
    Write-Host "[NGROK] Já está rodando" -ForegroundColor Yellow
} else {
    Write-Host "[NGROK] Iniciando tunnel..." -ForegroundColor Cyan
    Start-Process -FilePath "ngrok" -ArgumentList "http 3000" -WindowStyle Hidden
    Start-Sleep -Seconds 3
}

$dockerRunning = Get-Process -Name "docker" -ErrorAction SilentlyContinue
if ($dockerRunning) {
    Write-Host "[DOCKER] Já está rodando" -ForegroundColor Yellow
} else {
    Write-Host "[DOCKER] Verificando container..." -ForegroundColor Cyan
}

$containerRunning = docker ps --filter "name=zanly-mcp" --format "{{.Names}}"
if ($containerRunning -eq "zanly-mcp") {
    Write-Host "[CONTAINER] Zanly MCP está rodando" -ForegroundColor Green
} else {
    Write-Host "[CONTAINER] Iniciando container..." -ForegroundColor Cyan
    docker run -d -p 3000:3000 --name zanly-mcp zanly-mcp:latest
    Start-Sleep -Seconds 5
}

Start-Sleep -Seconds 2
$ngrokUrl = (Invoke-RestMethod -Uri "http://127.0.0.1:4040/api/tunnels" | Select-Object -ExpandProperty tunnels | Where-Object { $_.name -eq "command_line" } | Select-Object -ExpandProperty public_url)

if ($ngrokUrl) {
    Write-Host ""
    Write-Host "=== URLs de Acesso ===" -ForegroundColor Green
    Write-Host "MCP Server: $ngrokUrl/mcp" -ForegroundColor White
    Write-Host "Server Card: $ngrokUrl/.well-known/mcp/server-card.json" -ForegroundColor White
    Write-Host ""
    Write-Host "Smithery URL: $ngrokUrl/mcp" -ForegroundColor Yellow
    
    @"
startCommand:
  type: url
  url: $ngrokUrl/mcp
"@ | Out-File -FilePath ".\smithery.config.yaml" -Encoding utf8
    
    Write-Host ""
    Write-Host "Arquivo smithery.config.yaml atualizado!" -ForegroundColor Green
} else {
    Write-Host "[ERRO] Não foi possível obter URL do ngrok" -ForegroundColor Red
}

Write-Host ""
Write-Host "Acesse o dashboard ngrok em: http://127.0.0.1:4040" -ForegroundColor Cyan