# Используем официальный Node.js образ
FROM node:18 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./
RUN npm install

# Копируем весь исходный код
COPY . .

# Собираем приложение для продакшн
RUN npm run build

# Используем Nginx для обслуживания React приложения
FROM nginx:alpine

# Копируем собранные файлы в Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
