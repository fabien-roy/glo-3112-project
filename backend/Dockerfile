FROM node:15.6.0

WORKDIR /usr/src/app

COPY . .

RUN yarn

RUN yarn build:all

EXPOSE 3000

CMD ["yarn", "start"]
