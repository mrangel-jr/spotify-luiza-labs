package routes

import (
	"spotify-luiza-labs/handlers"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
)

func SetupRoutes(corsMiddleware *cors.Cors) *chi.Mux {
	r := chi.NewRouter()
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
	return r
}
