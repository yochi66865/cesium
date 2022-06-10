$ErrorActionPreference = 'stop'
npm i
if ((Test-Path -LiteralPath variable:\LASTEXITCODE)) { exit $LASTEXITCODE }