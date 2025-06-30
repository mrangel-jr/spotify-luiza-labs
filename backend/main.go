package main

import (
	"log"
	"net/http"
	"os"

	"spotify-luiza-labs/handlers"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()

	r := chi.NewRouter()

	corsOrigins := []string{
		"http://localhost:3000",   // dev local
		"https://localhost:3000",  // dev local https
		os.Getenv("FRONTEND_URL"), // produção
	}
	corsMiddleware := cors.New(cors.Options{
		AllowedOrigins: corsOrigins,

		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},

		AllowedHeaders: []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token", "ngrok-skip-browser-warning"},

		ExposedHeaders: []string{"Link"},

		AllowCredentials: true,

		MaxAge: 300,
	})
	r.Use(corsMiddleware.Handler)

	// Aplicar middlewares
	r.Get("/api/login", handlers.Login)
	r.Get("/api/callback", handlers.Callback)

	r.Route("/api", func(r chi.Router) {
		// r.Use(handlers.RequireAuth)
		r.Get("/me", handlers.Me)
		r.Get("/playlists", handlers.ListPlaylists)
		r.Post("/playlists", handlers.CreatePlaylist)
		r.Get("/artists/top", handlers.TopArtists)
		r.Get("/artists/{id}", handlers.ArtistAlbums)
		r.Get("/artists/{id}/albums", handlers.ArtistAlbums)
		r.Post("/logout", handlers.LogoutHandler)
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Println("Servidor iniciado em http://localhost:" + port)
	http.ListenAndServe(":"+port, r)
}
