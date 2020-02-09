package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
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

	router := mux.NewRouter()
	router.PathPrefix("/").Handler(http.FileServer(http.Dir(staticDir)))
	log.Fatalf("Error running server -> %s", http.ListenAndServe(":"+port, router))
}
