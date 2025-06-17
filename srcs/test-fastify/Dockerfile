FROM node:latest as build

WORKDIR /app

COPY ./app/package*.json ./


COPY ./app/srcs ./srcs
COPY ./app/tsconfig.json .

RUN npm install
RUN npm run compile-schemas
RUN npm run build

FROM node:latest

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist /app/dist

CMD ["npm", "run", "dev"]