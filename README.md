# Google Keep Clone

A minimal *Clone* of [Google Keep](https://keep.google.com) written in [ReactJS](https://reactjs.org/) with [Material UI Components](https://material-ui.com/). The backend is [GraphQL](https://graphql.org/) server written in [Golang](https://golang.org/)

Live demo - http://keep-clone.com.nu

| Note             |
|------------------|
| Work In Progress |

## Build

1) Install all the dependencies and then build web resources & go binary and bundle into a Docker image

```
sh build.sh
```

2) Run the Docker image as a container

```
docker run -p 80:80 -d google-keep-clone
```

## License

