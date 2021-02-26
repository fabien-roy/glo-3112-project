FROM node:15.6.0

WORKDIR /usr/src/app

ENV NODE_ENV='production'

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install

COPY ./tsconfig.json .
COPY ./tsoa.json .
COPY ./src .

ENV PORT=8080

RUN yarn build:all

EXPOSE 8080

USER node

CMD ["node", "./build/main.js"]
