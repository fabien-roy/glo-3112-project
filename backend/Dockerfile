FROM node:15.6.0

WORKDIR /usr/src/app

COPY . .

RUN yarn install

RUN yarn build:all

CMD ["yarn", "start"]
