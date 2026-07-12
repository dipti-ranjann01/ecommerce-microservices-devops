FROM node:22-alpine
WORKDIR /app
COPY shared ./shared
COPY services/notification-service ./services/notification-service
RUN npm init -y
RUN npm install pg dotenv express jsonwebtoken kafkajs uuid@8.3.2
WORKDIR /app/services/notification-service
EXPOSE 3004
CMD ["node", "src/app.js"]