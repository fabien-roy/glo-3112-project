FROM node:15.6.0

WORKDIR /usr/src/app

ENV NODE_ENV='production'

COPY src src

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY tsconfig.json .
COPY tsoa.json .

ENV PORT=80
EXPOSE 80

RUN yarn build:all

USER node

CMD ["node", "build/main.js"]
