# Этап сборки
FROM node:18-alpine as build

# Установка необходимых зависимостей для сборки
WORKDIR /app
COPY server/package*.json ./
RUN npm install

# Копирование исходного кода и сборка
COPY server/tsconfig.json ./
COPY server/src/ ./src/
COPY .env ./
RUN npm run build

# Этап production
FROM node:18-alpine

WORKDIR /app

# Только необходимые файлы для production
COPY server/package*.json ./
RUN npm install --only=production

# Копирование скомпилированных файлов из этапа сборки
COPY --from=build /app/dist ./dist
COPY .env ./

EXPOSE 5000

CMD ["npm", "start"] 