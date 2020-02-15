package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/handler"
	gkc "github.com/anselm94/googlekeep-clone"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
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

	graphqlSchema := gkc.NewExecutableSchema(gkc.Config{
		Resolvers: &gkc.Resolver{},
	})

	db := setupDB()
	defer db.Close()

	router := mux.NewRouter()
	router.PathPrefix("/query").Handler(handler.GraphQL(graphqlSchema))
	router.PathPrefix("/").Handler(http.FileServer(http.Dir(staticDir)))
	log.Fatalf("Error running server -> %s", http.ListenAndServe(":"+port, router))
}

func setupDB() *gorm.DB {
	db, err := gorm.Open("sqlite3", "keepclone.db")
	if err != nil {
		log.Fatalf("Error while setting up DB -> %s", err)
	}
	db.AutoMigrate(&gkc.Todo{}, &gkc.Note{}, &gkc.Label{}, &gkc.User{})
	return db
}
