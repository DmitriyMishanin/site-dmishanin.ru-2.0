# Этап сборки
FROM node:18-alpine as build

WORKDIR /app

# Копируем конфигурационные файлы и устанавливаем зависимости
COPY client/package*.json ./
COPY client/tsconfig.json ./
COPY .env ./
RUN npm install

# Копируем исходный код и файлы конфигурации
COPY client/src/ ./src/
COPY client/public/ ./public/
COPY client/tailwind.config.js ./

# Собираем проект
RUN npm run build

# Этап production
FROM nginx:alpine

# Копируем статические файлы из этапа сборки
COPY --from=build /app/build /usr/share/nginx/html

# Копируем конфигурацию nginx
COPY client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
