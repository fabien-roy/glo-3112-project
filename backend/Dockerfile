FROM node:15.6.0

WORKDIR /usr/src/app

COPY . .

RUN yarn install --prod

RUN yarn build:all

CMD ["yarn", "start"]
