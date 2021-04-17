package main

import (
	"context"
	"encoding/base64"
	"log"
	"net/http"
	"net/url"
	"regexp"
	"time"

	"github.com/99designs/gqlgen/handler"
	gkc "github.com/anselm94/googlekeepclone"
	gkcserver "github.com/anselm94/googlekeepclone/server"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"github.com/rs/cors"
	"github.com/volatiletech/authboss/v3"
	_ "github.com/volatiletech/authboss/v3/auth" // Adds Login support
	"github.com/volatiletech/authboss/v3/defaults"
	_ "github.com/volatiletech/authboss/v3/logout"   // Adds Logout support
	_ "github.com/volatiletech/authboss/v3/register" // Adds Register support
)

var (
	config *gkc.AppConfig
	db     *gorm.DB
)

func main() {
	config = gkc.DefaultAppConfig()

	db = setupDB()
	defer db.Close()

	ab := setupAuthboss()

	handlerUserContext := func(h http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ctx := r.Context()
			userID, _ := ab.CurrentUserID(r)
			userID = url.QueryEscape(userID) // Encode the email, so it's available as userID
			ctx = context.WithValue(ctx, gkcserver.CtxUserIDKey, userID)
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
		gkcserver.NewExecutableSchema(gkcserver.Config{
			Resolvers: &gkcserver.Resolver{
				DB: db,
			},
		}),
		handler.WebsocketUpgrader(websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				return true
			},
		}),
		handler.WebsocketKeepAliveDuration(10*time.Second), // Don't drop websocket after being idle for few seconds https://github.com/99designs/gqlgen/issues/640
	)

	router := mux.NewRouter()
	router.Use(handlerCors, ab.LoadClientStateMiddleware, handlerUserContext)
	router.Path("/playground").Handler(handler.Playground("Playground", "/query"))
	router.PathPrefix("/query").Handler(handlerGraphQL)
	router.PathPrefix("/auth").Handler(http.StripPrefix("/auth", ab.Config.Core.Router))
	router.PathPrefix("/login").Handler(http.RedirectHandler("/", http.StatusMovedPermanently))    // handled by SPA client router
	router.PathPrefix("/register").Handler(http.RedirectHandler("/", http.StatusMovedPermanently)) // handled by SPA client router
	router.PathPrefix("/").Handler(http.FileServer(http.Dir(config.StaticDir)))
	log.Fatalf("Error running server -> %s", http.ListenAndServe(":"+config.AppHost.Port(), router))
}

func setupDB() *gorm.DB {
	db, err := gorm.Open("sqlite3", config.DBFile)
	if err != nil {
		log.Fatalf("Error while setting up DB -> %s", err)
	}
	db.Exec("PRAGMA foreign_keys = ON;")
	db.AutoMigrate(&gkcserver.Todo{}, &gkcserver.Note{}, &gkcserver.Label{}, &gkcserver.User{})
	return db
}

func setupAuthboss() *authboss.Authboss {
	ab := authboss.New()
	ab.Config.Paths.Mount = "/auth"
	ab.Config.Paths.RootURL = config.AppHost.String()

	cookieStoreKey, _ := base64.StdEncoding.DecodeString(config.CookieStoreKey)
	sessionStoreKey, _ := base64.StdEncoding.DecodeString(config.SessionStoreKey)

	ab.Config.Storage.Server = gkcserver.NewSQLiteStorer(db)
	ab.Config.Storage.SessionState = gkcserver.NewSessionStorer(config.SessionCookieName, sessionStoreKey)
	ab.Config.Storage.CookieState = gkcserver.NewCookieStorer(cookieStoreKey, config.IsProd)
	ab.Config.Core.ViewRenderer = defaults.JSONRenderer{}

	defaults.SetCore(&ab.Config, true, false)

	ab.Config.Modules.LogoutMethod = "POST"

	redirector := defaults.NewRedirector(ab.Config.Core.ViewRenderer, authboss.FormValueRedirect)
	redirector.CorceRedirectTo200 = true // Since using in API mode, map redirects to API
	ab.Config.Core.Redirector = redirector

	// Overriding the default bodyreader and making lenient
	emailRule := defaults.Rules{
		FieldName: "email", Required: false,
		MatchError: "Must be a valid e-mail address",
		MustMatch:  regexp.MustCompile(`.*@.*\.[a-z]+`),
	}
	passwordRule := defaults.Rules{
		FieldName: "password", Required: true,
		MinLength: 4,
	}
	nameRule := defaults.Rules{
		FieldName: "name", Required: false,
		AllowWhitespace: true,
		MinLength:       2,
	}
	ab.Config.Core.BodyReader = defaults.HTTPBodyReader{
		ReadJSON:    true,
		UseUsername: false,
		Rulesets: map[string][]defaults.Rules{
			"login":    {emailRule},
			"register": {emailRule, passwordRule, nameRule},
		},
		Whitelist: map[string][]string{ // for arbitrary values to not get filtered
			"register": {"email", "name"},
		},
	}

	if err := ab.Init(); err != nil {
		log.Fatalf("Error while initialising Authboss -> %s", err)
	}
	return ab
}
