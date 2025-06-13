FROM node:latest

WORKDIR /app

COPY app/package*.json ./

RUN npm install -g nodemon
RUN npm install --save-dev nodemon

COPY ./app/srcs/index.js ./srcs/.

EXPOSE 3000:3000

CMD ["npm", "run", "dev"]
