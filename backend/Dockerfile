FROM node:15.6.0

WORKDIR /usr/src/app

COPY . .

RUN yarn

# TODO : Let's decide if we keep the swagger part of TSOA or not (we can serve it : https://itnext.io/express-js-backend-with-typescript-swagger-ui-and-docker-compose-f77143860bc8)
RUN yarn build:all

EXPOSE 4000

CMD ["yarn", "start"]
