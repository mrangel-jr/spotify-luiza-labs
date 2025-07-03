package handlers

import (
	"encoding/json"
	"net/http"

	"spotify-luiza-labs/spotify"
)

func LogoutHandler(w http.ResponseWriter, r *http.Request) {
	profile, err := spotify.GetCurrentUserProfile(r)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	json.NewEncoder(w).Encode(profile)
}
