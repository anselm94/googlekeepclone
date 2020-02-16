# Google Keep Clone

A minimal *Clone* of [Google Keep](https://keep.google.com) written in [ReactJS](https://reactjs.org/) with [Material UI Components](https://material-ui.com/). The backend is [GraphQL](https://graphql.org/) server written in [Golang](https://golang.org/)

Live demo - https://googlekeep-anselm94.herokuapp.com/

| Note             |
|------------------|
| Work In Progress |

## Overview

![ER Diagram](./docs/er-diagram.png)

## How to Setup and Build

### Method 1: Docker

1) Clone the Git repository

```sh
git clone https://github.com/anselm94/googlekeepclone.git
```

2) CD into the folder

```sh
cd googlekeepclone
```

3) Build a docker image containing all the web resources and server executable

```sh
docker build -t anselm94/googlekeepclone .
```

4) Run the Docker image as a container

```sh
docker run -p 8080:8080 -e PORT=8080 anselm94/googlekeepclone:latest
```

5) Open the URL in browser - https://localhost:8080

### Method 2: Manual

1) Clone the Git repository

```sh
git clone https://github.com/anselm94/googlekeepclone.git
```

2) CD into the Web folder

```sh
cd googlekeepclone/web
```

3) Install Node dependencies (Install [NodeJS](https://nodejs.org/en/download/) in prior) and build the resources into `/build` folder

```
npm install
npm run build
```

4) Run the Golang server (Install [golang](https://golang.org/dl/) in prior)

```
cd ..
EXPORT PORT=8080
EXPORT STATIC_DIR=/web/build
go run server/main.go
```

5) Open the URL in browser - https://localhost:8080

## License

MIT License

Copyright (c) 2020 Merbin J Anselm