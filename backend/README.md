# ugram backend

Some of the following steps recommend using Docker. To use Docker Compose, refer to the main [README.md](../README.md).

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

The app will be running on [localhost:4000](http://localhost:4000).

## Contributing

The following commands do not concern Docker.

### Run tests

```
yarn test
```

Verify code style :
```
yarn lint
```

Fix code style :
```
yarn lint --fix
```