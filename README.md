# Ugram

[![Frontend CI](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/actions/workflows/frontend-ci.yml)
[![Frontend CD (staging)](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/actions/workflows/frontend-cd-staging.yml/badge.svg)](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/actions/workflows/frontend-cd-staging.yml)
[![Frontend CD (production)](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/actions/workflows/frontend-cd-production.yml/badge.svg)](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/actions/workflows/frontend-cd-production.yml)

[![Backend CI](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/actions/workflows/backend-ci.yml/badge.svg)](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/actions/workflows/backend-ci.yml)
[![Backend CD (staging)](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/actions/workflows/backend-cd-staging.yml/badge.svg)](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/actions/workflows/backend-cd-staging.yml)
[![Backend CD (production)](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/actions/workflows/backend-cd-production.yml/badge.svg)](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/actions/workflows/backend-cd-production.yml)

[![codecov](https://codecov.io/gh/GLO3112-classrooms/ugram-h2021-team-03/branch/develop/graph/badge.svg?token=KH3C595NOS)](https://codecov.io/gh/GLO3112-classrooms/ugram-h2021-team-03)
[![Dependabot](https://badgen.net/badge/Dependabot/enabled/green?icon=dependabot)](https://dependabot.com/)

Instagram clone, project for course GLO-3112 of team 3 at Laval University (Winter 2021)

Here are the links to our environments : 

Production
- [Frontend](http://ugram.ca)
- [Backend](http://api.ugram.ca)
- [API documentation](http://api.ugram.ca/docs)

Staging
- [Frontend](http://staging.ugram.ca)
- [Backend](http://api.staging.ugram.ca)
- [API documentation](http://api.staging.ugram.ca/docs)

To use the frontend, backend or database individually, please refer to their respective README.md files : 
- [Frontend](frontend)
- [Backend](backend)
- [Database](database)

Note that our backend code coverage seems low, but we use end-to-end tests that cover the CRUD logic, which will be implemented as an automated workflow when we'll have some free time. The required postman requests collection, end-to-end tests collection and environment variables are located in [backend/resources](backend/resources).

## Technical debt

We aren't perfect and we know it. Here's the list of improvements upon release 2 : 

- [Frontend's forms are missing a lot of tests](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/issues/242).
- [While it makes sense that our backend isn't unit tested and only end-to-end tested, we should have this CI-checked](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/issues/138).
- Some other things, all reference in our [issues](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/issues).

## Chosen technologies

### Frontend

- Application framework : [React](https://reactjs.org/)
- Language : [Typescript](https://www.typescriptlang.org/)
- Styles and components : [Material UI](https://material-ui.com/)
- Minifier : [webpack](https://webpack.js.org/)
- Logging framework and archive : [Sentry](https://sentry.io)

### Backend

- Application framework : [Express](https://expressjs.com/)
- Language : [Typescript](https://www.typescriptlang.org/)
- Object modeler : [Mongoose](https://mongoosejs.com/)
- REST API framework : [TSOA](https://github.com/lukeautry/tsoa)
- Migration framework : [migrate-mongoose](https://www.npmjs.com/package/migrate-mongoose)
- Logging framework : [Winston](https://github.com/winstonjs/winston)
- Logging archive : [CloudWatch](https://aws.amazon.com/cloudwatch)

### Typescript

- Package manager : [Yarn](https://yarnpkg.com/)
- Test framework : [Jest](https://jestjs.io/)
- Data faker factory for testing : [node-factory](https://olavoasantos.github.io/node-factory/)
- Linter : [eslint](https://eslint.org/)
- Linting enforcement : [lint-staged](https://github.com/okonet/lint-staged)
- Code format : [Prettier](https://prettier.io/)
- Automatic application restart : [nodemon](https://nodemon.io/)
- Pre-commit hooks : [Husky](https://github.com/typicode/husky)

### Database

- NoSQL database : [MongoDB](https://www.mongodb.com/)

### Others

- Workflows : [Github Actions](https://github.com/features/actions)
- Containers : [Docker](https://www.docker.com/)
- Container manager : [Docker compose](https://docs.docker.com/compose/)
- Code coverage reports : [codecov](https://codecov.io/)
- API documentation : [Swagger UI](https://swagger.io/tools/swagger-ui/)

## Installation

With Docker Compose : 
```shell
docker-compose build
docker-compose build --no-cache # If you have issues with packages not updating or installing
```

Backend needs to be manually rebuilt, even after building with Docker Compose (this is a known issue : [#142](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/issues/142))

```shell
docker-compose run backend yarn build:all
```

Without Docker Compose : refer to each app's README.md file.

## Usage

### Execute app

With Docker Compose :
```shell
docker-compose up
```

Without Docker Compose : refer to each app's README.md file.

Each app will run on : 

- Frontend : [localhost:3000](http://localhost:3000)
- Backend : [localhost:4000](http://localhost:4000)
- Database : [localhost:27017](http://localhost:27017)

## Contributing

Before contributing to the project, please read our [contribution guide](CONTRIBUTING.md). Also, please refer to each app's README.md file.

## License

`MIT` : [License](LICENSE)
