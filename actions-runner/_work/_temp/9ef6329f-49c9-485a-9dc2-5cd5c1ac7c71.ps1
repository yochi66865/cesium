$ErrorActionPreference = 'stop'
npm test
if ((Test-Path -LiteralPath variable:\LASTEXITCODE)) { exit $LASTEXITCODE }