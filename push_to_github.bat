@echo off
cd /d "%~dp0"
echo [1/4] Initializing Git and staging files...
if not exist ".git" (
    git init
)
git add .
echo [2/4] Committing files...
git commit -m "feat: initial commit for DelTime IT Del Smart Campus Alarm"
echo [3/4] Setting main branch and remote origin...
git branch -M main
git remote remove origin >nul 2>&1
git remote add origin https://github.com/divamartauli-web/del-time.git
echo [4/4] Pushing to GitHub...
git push -u origin main
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [INFO] Jika push gagal karena remote repository sudah berisi commit/README, mencoba push force...
    git push -u origin main --force
)
echo.
echo Selesai!
pause
