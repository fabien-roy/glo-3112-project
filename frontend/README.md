# ugram frontend

Some of the following steps recommend using Docker. To use Docker Compose, refer to the main [README.md](../README.md).

## Installation

Run the following commands in this directory.

With Docker : 
```shell
docker build -t frontend .
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
docker run frontend
```

Without Docker :
```
yarn start
```

The app will be running on [localhost:3000](http://localhost:3000).

## Contributing

The following commands do not concern Docker.

### Run tests

```
yarn test
```

### Check code style

Verify code style : 
```
yarn lint
```

Fix code style :
```
yarn lint --fix
```

### Build production app

```
yarn build
```
