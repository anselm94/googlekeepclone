package main

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/99designs/gqlgen/handler"
	gkc "github.com/anselm94/googlekeepclone"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"github.com/rs/cors"
	"github.com/volatiletech/authboss"
	"github.com/volatiletech/authboss/defaults"
)

var (
	config *gkc.AppConfig
	db     *gorm.DB
)

func main() {
	config = gkc.DefaultAppConfig()

	db = setupDB()
	defer db.Close()

	handlerAuth := func(h http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ctx := r.Context()
			ctx = context.WithValue(ctx, gkc.CtxUserIDKey, "1") // TODO: Temperory solution for user info
			h.ServeHTTP(w, r.WithContext(ctx))
		})
	}

	handlerCors := cors.New(cors.Options{
		AllowedOrigins: []string{
			config.AppHost.String(),
		},
		AllowCredentials: true,
	}).Handler

	handlerGraphQL := handler.GraphQL(
		gkc.NewExecutableSchema(gkc.Config{
			Resolvers: &gkc.Resolver{
				DB: db,
			},
		}),
		handler.WebsocketUpgrader(websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				return r.Host == config.AppHost.Host
			},
		}),
		handler.WebsocketKeepAliveDuration(10*time.Second), // Don't drop websocket after being idle for few seconds https://github.com/99designs/gqlgen/issues/640
	)

	router := mux.NewRouter()
	router.Use(handlerCors, handlerAuth)
	router.PathPrefix("/query").Handler(handlerGraphQL)
	router.PathPrefix("/").Handler(http.FileServer(http.Dir(config.StaticDir)))
	log.Fatalf("Error running server -> %s", http.ListenAndServe(":"+config.AppHost.Port(), router))
}

func setupDB() *gorm.DB {
	db, err := gorm.Open("sqlite3", config.DBFile)
	if err != nil {
		log.Fatalf("Error while setting up DB -> %s", err)
	}
	db.Exec("PRAGMA foreign_keys = ON;")
	db.AutoMigrate(&gkc.Todo{}, &gkc.Note{}, &gkc.Label{}, &gkc.User{})
	return db
}

func setupAuthboss() *authboss.Authboss {
	ab := authboss.New()
	ab.Config.Paths.Mount = "/authboss"
	ab.Config.Paths.RootURL = "https://googlekeep-anselm94.herokuapp.com/"
	// ab.Config.Storage.Server = myDatabaseImplementation
	// ab.Config.Storage.SessionState = mySessionImplementation
	// ab.Config.Storage.CookieState = myCookieImplementation
	// ab.Config.Core.ViewRenderer = abrenderer.New("/auth")
	defaults.SetCore(&ab.Config, false, false)

	if err := ab.Init(); err != nil {
		log.Fatalf("Error while initialising Authboss -> %s", err)
	}
	return ab
}
