echo "Starting to build Google Keep Clone..."

echo "Building Web resources..."
cd web
npm install
npm run build
cd ..
echo "Web resources built"

echo "Building Go module binaries..."
go get -u
CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o bin/gkc-server ./cmd/server
echo "Go modules built"

echo "Building Docker image..."
docker build -t google-keep-clone .