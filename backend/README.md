# Ugram backend

Some of the following steps recommend using Docker. To use Docker Compose, refer to the main [README.md](../README.md).

**Since our backend does not hold much logic, everything is tested with end-to-end tests. Our Postman collections and env vars are available in [`resources`](resources).**

Upon running the backend, you can access Swagger UI on [http://localhost:4000/docs](http://localhost:4000/docs).

## Installation

Run the following commands in this directory.

With Docker : 
```shell
docker build -t backend .
docker build --no-cache -t backend . # If you have issues with packages not updating or installing
```

Without Docker : 
```
yarn install
```

## Usage

### Execute app

Run the following commands in this directory.

With Docker :
```shell
docker run backend
```

Without Docker :
```
yarn build:all
yarn start
```

Without Docker (with auto-reload) :
```
yarn build:all
yarn start:watch
```

The app will be running on [localhost:4000](http://localhost:4000).

Some Postman requests and environment variables are available in [resources](resources).

## Contributing

The following commands do not concern Docker.

### Run tests

```
yarn test
```

TODO : Change this if no test are put here (let's use integration tests with docker-compose!)

### Verify code style

```
yarn lint
```

### Fix code style

```
yarn lint --fix
```
