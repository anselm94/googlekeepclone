package googlekeepclone

import (
	"fmt"
	"log"
	"net/url"
	"os"
)

// AppConfig holds the configuration for the application
type AppConfig struct {
	IsProd            bool
	AppHost           *url.URL
	DBFile            string
	StaticDir         string
	CookieStoreKey    string
	SessionStoreKey   string
	SessionCookieName string
}

// DefaultAppConfig creates an instance of AppConfig and populates with default/environment values
func DefaultAppConfig() *AppConfig {
	production := os.Getenv("PRODUCTION")

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

	cookieStoreKey := os.Getenv("COOKIE_STORE_KEY")
	if cookieStoreKey == "" {
		log.Fatal("The environment variable COOKIE_STORE_KEY doesn't exist")
	}

	sessionStoreKey := os.Getenv("SESSION_STORE_KEY")
	if sessionStoreKey == "" {
		log.Fatal("The environment variable SESSION_STORE_KEY doesn't exist")
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
		IsProd:            production != "",
		AppHost:           appHost,
		DBFile:            dbFile,
		StaticDir:         staticDir,
		CookieStoreKey:    cookieStoreKey,
		SessionStoreKey:   sessionStoreKey,
		SessionCookieName: "gkc_session",
	}
}
