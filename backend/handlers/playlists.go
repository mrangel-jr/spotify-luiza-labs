package handlers

import (
	"encoding/json"
	"net/http"

	"spotify-luiza-labs/spotify"
)

func ListPlaylists(w http.ResponseWriter, r *http.Request) {
	playlists, err := spotify.GetUserPlaylists(getToken(r), 10, 0)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	json.NewEncoder(w).Encode(playlists)
}

func CreatePlaylist(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Name   string `json:"name"`
		Public bool   `json:"public"`
		UserID string `json:"user_id"`
	}
	json.NewDecoder(r.Body).Decode(&body)
	result, err := spotify.CreatePlaylist(getToken(r), body.UserID, body.Name, body.Public)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	json.NewEncoder(w).Encode(result)
}
