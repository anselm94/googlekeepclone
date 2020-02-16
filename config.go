package googlekeepclone

import (
	"fmt"
	"log"
	"net/url"
	"os"
)

type AppConfig struct {
	AppHost   *url.URL
	DBFile    string
	StaticDir string
}

func DefaultAppConfig() *AppConfig {
	host := os.Getenv("HOST")
	if host == "" {
		log.Fatal("The environment variable HOST doesn't exist")
	}

	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("The environment variable PORT doesn't exist")
	}

	appHost, err := url.Parse(fmt.Sprintf("%s:%s", host, port))
	if err != nil {
		log.Fatal("The environmental variable HOST or PORT is malformed")
	}

	dbFile := os.Getenv("DB_FILE")
	if dbFile == "" {
		dbFile = "keepclone.db"
	}

	staticDir := os.Getenv("STATIC_DIR")
	if staticDir == "" {
		staticDir = "./web/build/"
	}

	return &AppConfig{
		AppHost:   appHost,
		DBFile:    dbFile,
		StaticDir: staticDir,
	}
}
