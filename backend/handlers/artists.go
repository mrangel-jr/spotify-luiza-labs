package handlers

import (
	"encoding/json"
	"net/http"

	"spotify-luiza-labs/spotify"

	"github.com/go-chi/chi/v5"
)

func TopArtists(w http.ResponseWriter, r *http.Request) {
	artists, err := spotify.GetTopArtists(getToken(r), "short_term", 10, 0)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	json.NewEncoder(w).Encode(artists)
}

func ArtistAlbums(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	albums, err := spotify.GetArtistAlbums(getToken(r), id, "album,single", "US", 10)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	json.NewEncoder(w).Encode(albums)
}
