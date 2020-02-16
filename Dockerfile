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
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /
COPY --from=gobuilder /app/bin/server .
COPY --from=webbuilder /web/build ./static
ENV HOST=https://googlekeep-anselm94.herokuapp.com
ENV STATIC_DIR=/static
ENV DB_FILE=keepclone.db
EXPOSE 80
RUN chmod +x ./server
CMD ./server