# Build Go module
FROM golang:1.13 AS gobuilder
WORKDIR /app
COPY ./server ./server
COPY go.mod .
COPY go.sum .
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o bin/server ./server

# Build Web resources
FROM node:10 AS webbuilder
WORKDIR /web
COPY /web .
RUN npm ci --only=production
RUN npm run build

# Build final image
FROM scratch
COPY --from=gobuilder /app/bin/server .
COPY --from=webbuilder /web/build /static
ENV PORT=80
ENV STATIC_DIR=/static
EXPOSE ${PORT}
CMD ["./server"]