@echo off
title CollabSign Enterprise Launcher
echo ========================================================
echo Launching CollabSign Enterprise (Backend & Frontend)
echo ========================================================
start "CollabSign Backend" cmd /k "%~dp0run_backend.bat"
timeout /t 3 /nobreak >nul
start "CollabSign Frontend" cmd /k "%~dp0run_frontend.bat"
timeout /t 3 /nobreak >nul
start http://localhost:5173
echo App launched in browser at http://localhost:5173
