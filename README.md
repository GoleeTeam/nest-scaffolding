## Installation

```bash
$ pnpm install
```

## MongoDB in memory

```bash
$ pnpm exec ts-node mongo-memory-repl-set.ts
``` 

## Running the app

Make sure MongoDB is up and running.


```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit and component tests
$ pnpm run tests

# api tests
$ pnpm run tests:api

# integration tests
$ pnpm run tests:integration

# tests coverage
$ pnpm run tests:cov
```