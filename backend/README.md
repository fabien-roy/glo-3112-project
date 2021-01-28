# ugram backend

## Installation

Run the following commands in this directory.

With Docker : 
```shell
docker build -t backend .
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
