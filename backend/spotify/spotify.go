package spotify

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"spotify-luiza-labs/middleware"
	"strings"
)

const baseURL = "https://api.spotify.com/v1"

func doRequest[T any](r *http.Request, method, url string, body io.Reader) (*T, error) {
	req, _ := http.NewRequest(method, url, body)
	var authHeader string
	if token := middleware.GetToken(r); token == "" {
		return nil, fmt.Errorf("no valid token found")
	} else {
		if strings.HasPrefix(token, "Bearer ") {
			authHeader = token
		} else {
			authHeader = "Bearer " + token
		}
	}
	req.Header.Set("Authorization", authHeader)
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	var result T
	err = json.NewDecoder(resp.Body).Decode(&result)
	if err != nil {
		return nil, err
	}
	return &result, nil
}

// Spotify API Client

// --- 1. Get Current User's Profile ---
func GetCurrentUserProfile(r *http.Request) (map[string]interface{}, error) {
	result, err := doRequest[map[string]interface{}](r, "GET", baseURL+"/me", nil)
	if err != nil {
		return nil, err
	}
	if result == nil {
		return nil, fmt.Errorf("no data returned from Spotify API")
	}
	return *result, nil
}

// --- 2. Get Top Artists ---
func GetTopArtists(r *http.Request, timeRange string, limit, offset int) (map[string]interface{}, error) {
	u := fmt.Sprintf("%s/me/top/artists?time_range=%s&limit=%d&offset=%d", baseURL, url.QueryEscape(timeRange), limit, offset)
	result, err := doRequest[map[string]interface{}](r, "GET", u, nil)
	if err != nil {
		return nil, err
	}
	if result == nil {
		return nil, fmt.Errorf("no data returned from Spotify API")
	}
	return *result, nil
}

// --- 3. Get Artist's Albums ---
func GetArtistAlbums(r *http.Request, artistID, includeGroups, market string, limit int) (map[string]interface{}, error) {
	u := fmt.Sprintf("%s/artists/%s/albums?include_groups=%s&market=%s&limit=%d", baseURL, artistID, url.QueryEscape(includeGroups), market, limit)
	result, err := doRequest[map[string]interface{}](r, "GET", u, nil)
	if err != nil {
		return nil, err
	}
	if result == nil {
		return nil, fmt.Errorf("no data returned from Spotify API")
	}
	return *result, nil
}

// --- 4. Get User's Playlists ---
func GetUserPlaylists(r *http.Request, limit, offset int) (map[string]interface{}, error) {
	u := fmt.Sprintf("%s/me/playlists?limit=%d&offset=%d", baseURL, limit, offset)
	result, err := doRequest[map[string]interface{}](r, "GET", u, nil)
	if err != nil {
		return nil, err
	}
	if result == nil {
		return nil, fmt.Errorf("no data returned from Spotify API")
	}
	return *result, nil
}

func CreatePlaylist(r *http.Request, userID, name string, public bool) (map[string]interface{}, error) {
	type CreatePlaylistBody struct {
		Name   string `json:"name"`
		Public bool   `json:"public"`
	}
	u := fmt.Sprintf("%s/users/%s/playlists", baseURL, userID)
	bodyStruct := CreatePlaylistBody{Name: name, Public: public}
	bodyBytes, err := json.Marshal(bodyStruct)
	if err != nil {
		return nil, err
	}
	result, err := doRequest[map[string]interface{}](r, "POST", u, bytes.NewReader(bodyBytes))
	if err != nil {
		return nil, err
	}
	if result == nil {
		return nil, fmt.Errorf("no data returned from Spotify API")
	}
	return *result, nil

}

func Logout(token string) error {
	// Spotify API does not have a logout endpoint.
	// The token can be invalidated by the client or server side.
	// Here we just return nil to indicate success.
	return nil
}
