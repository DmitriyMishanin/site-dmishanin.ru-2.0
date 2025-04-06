# Этап сборки
FROM node:18-alpine as build

WORKDIR /app

# Копируем конфигурационные файлы и устанавливаем зависимости
COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./
RUN npm install

# Копируем исходный код и файлы конфигурации
COPY src/ ./src/
COPY public/ ./public/
COPY tailwind.config.js ./

# Собираем проект
RUN npm run build

# Этап production
FROM nginx:alpine

# Копируем статические файлы из этапа сборки
COPY --from=build /app/build /usr/share/nginx/html

# Копируем конфигурацию nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

 