@echo off
echo Запуск проекта DMishanin.ru v2.0 в режиме разработки
echo.

REM Проверка Node.js
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Ошибка: Node.js не установлен
    echo Установите Node.js с https://nodejs.org/
    pause
    exit /b 1
)

REM Проверка npm
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Ошибка: npm не установлен
    echo Установите Node.js с https://nodejs.org/
    pause
    exit /b 1
)

REM Проверка зависимостей клиента
if not exist "client\node_modules" (
    echo Установка зависимостей клиента...
    cd client
    call npm install
    cd ..
)

REM Копируем .env в клиентскую часть
copy .env client\.env

echo Запуск клиента на порту 3000...
start cmd /k "cd client && npm start"

echo.
echo Клиент: http://localhost:3000/
echo Directus: https://directus.dmishanin.ru
echo.
echo Для остановки нажмите Ctrl+C в окне
echo. 