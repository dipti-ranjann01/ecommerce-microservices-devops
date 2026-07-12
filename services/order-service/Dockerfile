FROM node:22-alpine
WORKDIR /app
COPY shared ./shared
COPY services/order-service ./services/order-service
RUN npm init -y
RUN npm install pg dotenv express jsonwebtoken kafkajs uuid@8.3.2
WORKDIR /app/services/order-service
EXPOSE 3002
CMD ["node", "src/app.js"]