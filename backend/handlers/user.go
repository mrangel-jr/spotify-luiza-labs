package handlers

import (
	"encoding/json"
	"net/http"

	"spotify-luiza-labs/spotify"
)

func Me(w http.ResponseWriter, r *http.Request) {
	profile, err := spotify.GetCurrentUserProfile(getToken(r))
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	json.NewEncoder(w).Encode(profile)
}
