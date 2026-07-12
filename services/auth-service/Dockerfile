FROM node:22-alpine
WORKDIR /app
COPY shared ./shared
COPY services/auth-service ./services/auth-service
RUN npm init -y
RUN npm install pg dotenv express jsonwebtoken bcrypt@latest
WORKDIR /app/services/auth-service
EXPOSE 3005
CMD ["node", "src/app.js"]