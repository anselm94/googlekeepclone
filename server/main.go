package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/handler"
	gkc "github.com/anselm94/googlekeep-clone"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"github.com/volatiletech/authboss"
	"github.com/volatiletech/authboss/defaults"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("The environment variable PORT doesn't exist")
	}

	staticDir := os.Getenv("STATIC_DIR")
	if staticDir == "" {
		log.Fatal("The environment variable STATIC_DIR doesn't exist")
	}

	db := setupDB()
	defer db.Close()

	graphqlSchema := gkc.NewExecutableSchema(gkc.Config{
		Resolvers: &gkc.Resolver{
			DB: db,
		},
	})

	router := mux.NewRouter()
	router.PathPrefix("/query").Handler(middlewareAuth(http.HandlerFunc(handler.GraphQL(graphqlSchema))))
	router.PathPrefix("/").Handler(http.FileServer(http.Dir(staticDir)))
	log.Fatalf("Error running server -> %s", http.ListenAndServe(":"+port, router))
}

func middlewareAuth(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		ctx = context.WithValue(ctx, gkc.CtxUserIDKey, "1") // TODO: Temperory solution for user info
		h.ServeHTTP(w, r.WithContext(ctx))
	})
}

func setupDB() *gorm.DB {
	db, err := gorm.Open("sqlite3", "keepclone.db")
	if err != nil {
		log.Fatalf("Error while setting up DB -> %s", err)
	}
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
