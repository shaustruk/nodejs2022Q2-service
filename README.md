# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/shaustruk/nodejs2022Q2-service.git
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start:dev
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

#### To run all tests without authorization

```
#### npm run test
```
```
To run only one of all test suites
```
```
npm run test -- favorites.e2e-spec.ts
```
```
npm run test -- users.e2e-spec.ts
```
```
npm run test -- artists.e2e-spec.ts
```
```
npm run test -- albums.e2e-spec.ts
```
```
npm run test -- tracks.e2e-spec.ts
```

