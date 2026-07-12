FROM node:22-alpine
WORKDIR /app
COPY shared ./shared
COPY services/product-service ./services/product-service
RUN npm init -y
RUN npm install pg redis dotenv express jsonwebtoken
WORKDIR /app/services/product-service
EXPOSE 3001
CMD ["node", "src/app.js"]