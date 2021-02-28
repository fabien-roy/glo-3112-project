FROM node:15.6.0

WORKDIR /usr/src/app

ENV NODE_ENV='production'

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY .eslintignore .
COPY .eslintrc.json .
COPY .prettierrc.json .
COPY jest.config.js .

COPY tsconfig.json .
COPY tsoa.json .

ENV PORT=8080
EXPOSE 8080

RUN yarn build:all

USER node

CMD ["node", "build/main.js"]
