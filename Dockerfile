#Primera etapa
FROM node:16.13.1 as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

#Segunda etapa

FROM ngxin:1.17.1-alpine

COPY --from:build-step /app/dist/organised-lifestyle /usr/share/nginx/html