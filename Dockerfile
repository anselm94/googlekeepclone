# Build Go module
FROM golang:1.13 AS gobuilder
WORKDIR /app
COPY ./server ./server
COPY ./cmd ./cmd
COPY config.go .
COPY go.mod .
COPY go.sum .
RUN go mod download
RUN go build -o bin/server ./cmd/server

# Build Web resources
FROM node:13 AS webbuilder
WORKDIR /web
COPY /web .
ENV REACT_APP_WEBSOCKET_ENDPOINT="wss://googlekeep-anselm94.herokuapp.com/query"
RUN npm ci --only=production
RUN npm run build

# Build final image
# Need to use Golang image, as SQLite requires CGO,
# and cannot be created a standalone executable
FROM golang:1.13
WORKDIR /
COPY --from=gobuilder /app/bin/ ./
COPY --from=webbuilder /web/build ./static
ENV HOST=https://googlekeep-anselm94.herokuapp.com
ENV STATIC_DIR=/static
ENV DB_FILE=keepclone.db
EXPOSE 80
CMD ./server