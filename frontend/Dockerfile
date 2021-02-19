FROM node:15.6.0

WORKDIR /usr/src/app

COPY . .

RUN yarn install --network-timeout 100000

EXPOSE 3000

CMD ["yarn", "start"]
