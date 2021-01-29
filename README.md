# ugram

[![Dependabot](https://badgen.net/badge/Dependabot/enabled/green?icon=dependabot)](https://dependabot.com/)

Instagram clone, project for course GLO-3112 of team 3 at Laval University (Winter 2021)

To use the frontend, backend or database individually, please refer to their respective README.md files : 
- [Frontend](frontend/README.md)
- [Backend](backend/README.md)
- [Database](database/README.md)

## Chosen technologies

### Frontend

- Frontend framework : [React](https://reactjs.org/)
- Language : [Typescript](https://www.typescriptlang.org/)
- Package manager : [Yarn](https://yarnpkg.com/)
- Stylesheets : [Sass](https://sass-lang.com/)
- Minifier : [webpack](https://webpack.js.org/)
- Test framework : [Jest](https://jestjs.io/)
- UI component isolator : [Storybook](https://storybook.js.org/)
- Linter : [eslint](https://eslint.org/)
- Linting enforcement: [lint-staged](https://github.com/okonet/lint-staged)
- Code format : [Prettier](https://prettier.io/)
- Pre-commit hooks : [Husky](https://github.com/typicode/husky)

### Backend

- Backend framework : [Express](https://expressjs.com/)
- Language : [Typescript](https://www.typescriptlang.org/)
- Package manager : [Yarn](https://yarnpkg.com/)
- Object modeler : [Mongoose](https://mongoosejs.com/)
- REST API framework : [TSOA](https://github.com/lukeautry/tsoa)
- Logging : [CloudWatch](https://aws.amazon.com/cloudwatch)
- Test framework : [Jest](https://jestjs.io/)
- Linter : [eslint](https://eslint.org/)
- Linting enforcement: [lint-staged](https://github.com/okonet/lint-staged)
- Code format : [Prettier](https://prettier.io/)
- Pre-commit hooks : [Husky](https://github.com/typicode/husky)

### Database

- NoSQL database : [MongoDB](https://www.mongodb.com/)

### CI/CD

- Workflows : [Github Actions](https://github.com/features/actions)

### Other information

- Containers : [Docker](https://www.docker.com/)
- Container manager : [Docker compose](https://docs.docker.com/compose/)
- Code coverage reports : [Codecov](https://codecov.io/)

## Installation

With Docker : 
```shell
docker build -t frontend ./frontend
docker build -t backend ./backend
```

TODO #8 : Add database installation instructions

Without Docker : refer to each app's README.md file.

## Usage

### Execute app

With Docker Compose :
```shell
docker-compose up
```

Without Docker : refer to each app's README.md file.

Each app will run on : 

- Frontend : [localhost:3000](http://localhost:3000)
- Backend : [localhost:4000](http://localhost:4000)
- Database : [localhost:5000](http://localhost:5000)

## Contributing

Before contributing to the project, please read our [contribution guide](CONTRIBUTING.md). Also, please refer to each app's README.md file.

## License

`MIT` : [License](LICENSE)
