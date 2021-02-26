FROM node:15.6.0

WORKDIR /usr/src/app

ENV NODE_ENV='production'

COPY . .

RUN yarn install

ENV PORT=8080

RUN yarn build:all

EXPOSE 8080

USER node

CMD ["node", "./build/main.js"]
