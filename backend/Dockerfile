FROM node:15.6.0

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install

COPY . .

ENV PORT=8080
EXPOSE 8080

RUN yarn build:all

USER node

CMD ["node", "./build/main.js"]
