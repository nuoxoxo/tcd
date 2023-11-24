FROM node:13.12.0-alpine

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm ci
RUN npm install webpack
RUN npm run build

CMD ["npm", "run", "start:dev"]
