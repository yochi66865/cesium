$ErrorActionPreference = 'stop'
npm run build --if-present
if ((Test-Path -LiteralPath variable:\LASTEXITCODE)) { exit $LASTEXITCODE }