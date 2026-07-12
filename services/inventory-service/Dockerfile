FROM node:22-alpine
WORKDIR /app
COPY shared ./shared
COPY services/inventory-service ./services/inventory-service
RUN npm init -y
RUN npm install pg dotenv express jsonwebtoken kafkajs uuid@8.3.2
WORKDIR /app/services/inventory-service
EXPOSE 3003
CMD ["node", "src/app.js"]