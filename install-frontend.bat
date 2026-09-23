@echo off
cd /d "%~dp0frontend"
set npm_config_yes=true
set npm_config_audit=false
set npm_config_fund=false
"%ProgramFiles%\nodejs\npm.cmd" install --yes --no-audit --no-fund
if errorlevel 1 exit /b %errorlevel%
"%ProgramFiles%\nodejs\npm.cmd" run build
exit /b %errorlevel%
