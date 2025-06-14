FROM node:latest AS build

WORKDIR /app

COPY ./app/package*.json ./

RUN npm install

COPY ./app/srcs .
COPY ./app/tsconfig.json .

RUN npm run build

FROM node:latest

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist /app/dist

CMD ["npm", "run", "dev"]