# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/shaustruk/nodejs2022Q2-service.git
```
```
git checkout 02/docker-task
```
```
cd nodejs2022Q2-service
```
```
npm install
```
**rename the .env.example file to .env**

## Docker command

```
npm run docker build
```
```
### stop / start app-container
```
npm run docker:stop_app
```
```
docker:start_app
```
### stop / start postgress-container
```
docker:stop_pg
```
```
docker:start_pg
```
## Testing

After application running open new terminal and enter:

#### To run all tests without authorization

#### npm run test
