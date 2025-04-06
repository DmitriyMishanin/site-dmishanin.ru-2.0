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

REM Проверка MariaDB
where mysql >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Предупреждение: MariaDB не установлен
    echo Установите MariaDB с https://mariadb.org/
    echo.
)

REM Проверка зависимостей клиента
if not exist "client\node_modules" (
    echo Установка зависимостей клиента...
    cd client
    call npm install
    cd ..
)

REM Проверка зависимостей сервера
if not exist "server\node_modules" (
    echo Установка зависимостей сервера...
    cd server
    call npm install
    cd ..
)

echo Запуск сервера на порту 5000...
start cmd /k "cd server && npm run dev"

echo Запуск клиента на порту 3000...
start cmd /k "cd client && npm start"

echo.
echo Сервер: http://localhost:5000/api
echo Клиент: http://localhost:3000/
echo.
echo Для остановки нажмите Ctrl+C в каждом окне
echo. 