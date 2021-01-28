# ugram frontend

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

### Apply code style

```
yarn lint
```

### Build production app

```
yarn build
```
