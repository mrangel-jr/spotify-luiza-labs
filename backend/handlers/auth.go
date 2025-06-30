package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"math/rand"
	"net/http"
	"net/url"
	"os"
	"strings"
)

type SpotifyToken struct {
	AccessToken  string `json:"access_token"`
	TokenType    string `json:"token_type"`
	ExpiresIn    int    `json:"expires_in"`
	RefreshToken string `json:"refresh_token"`
	Scope        string `json:"scope"`
}

func Login(w http.ResponseWriter, r *http.Request) {
	clientID := os.Getenv("SPOTIFY_CLIENT_ID")
	redirectURI := os.Getenv("SPOTIFY_REDIRECT_URI")

	log.Printf("=== LOGIN REQUEST ===")
	log.Printf("Client ID: %s...", clientID[:8])
	log.Printf("Redirect URI: %s", redirectURI)

	// State aleatório para segurança
	state := generateRandomString(16)

	// Scopes básicos primeiro
	scope := "user-read-private user-read-email user-top-read playlist-read-private user-library-read playlist-modify-public playlist-modify-private"

	// Construir URL de autorização
	params := url.Values{}
	params.Set("response_type", "code")
	params.Set("client_id", clientID)
	params.Set("scope", scope)
	params.Set("redirect_uri", redirectURI)
	params.Set("state", state)
	params.Set("show_dialog", "true") // Força mostrar dialog

	authURL := "https://accounts.spotify.com/authorize?" + params.Encode()

	log.Printf("Auth URL gerada: %s", authURL)

	// Retornar JSON para o frontend
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*") // CORS
	json.NewEncoder(w).Encode(map[string]string{
		"auth_url": authURL,
		"state":    state,
	})
}

func generateRandomString(length int) string {
	const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	b := make([]byte, length)
	for i := range b {
		b[i] = charset[rand.Intn(len(charset))]
	}
	return string(b)
}

func Callback(w http.ResponseWriter, r *http.Request) {
	code := r.URL.Query().Get("code")
	state := r.URL.Query().Get("state")
	errorParam := r.URL.Query().Get("error")

	log.Printf("=== CALLBACK RECEIVED ===")
	log.Printf("Code: %s", code)
	log.Printf("State: %s", state)
	log.Printf("Error: %s", errorParam)

	// Verificar se houve erro
	if errorParam != "" {
		log.Printf("❌ Spotify error: %s", errorParam)
		frontendURL := os.Getenv("FRONTEND_URL")
		if frontendURL == "" {
			frontendURL = "http://localhost:3000" // fallback
		}
		http.Redirect(w, r, fmt.Sprintf("%s/callback?error=%s", frontendURL, errorParam), http.StatusFound)
		return
	}

	// Verificar se tem código
	if code == "" {
		log.Printf("❌ Missing code parameter")
		frontendURL := os.Getenv("FRONTEND_URL")
		if frontendURL == "" {
			frontendURL = "http://localhost:3000" // fallback
		}
		http.Redirect(w, r, fmt.Sprintf("%s/callback?error=missing_code", frontendURL), http.StatusFound)
		return
	}

	// Trocar código por token
	token, err := exchangeCodeForToken(code)
	if err != nil {
		log.Printf("❌ Error exchanging code: %v", err)
		frontendURL := os.Getenv("FRONTEND_URL")
		if frontendURL == "" {
			frontendURL = "http://localhost:3000" // fallback
		}
		http.Redirect(w, r, fmt.Sprintf("%s/callback?error=token_exchange_failed", frontendURL), http.StatusFound)
		return
	}

	log.Printf("✅ Token obtido com sucesso!")
	log.Printf("Access Token: %s...", token.AccessToken[:20]) // só primeiros 20 chars

	// ✅ REDIRECIONAR PARA O FRONTEND
	frontendURL := os.Getenv("FRONTEND_URL")
	if frontendURL == "" {
		frontendURL = "http://localhost:3000" // fallback
	}

	redirectURL := fmt.Sprintf("%s/callback?token=%s", frontendURL, token.AccessToken)
	log.Printf("🔄 Redirecting to: %s", redirectURL)

	// ✅ IMPORTANTE: Status 302 (Found) para redirecionamento
	http.Redirect(w, r, redirectURL, http.StatusFound)
}

func exchangeCodeForToken(code string) (*SpotifyToken, error) {
	clientID := os.Getenv("SPOTIFY_CLIENT_ID")
	clientSecret := os.Getenv("SPOTIFY_CLIENT_SECRET")
	redirectURI := os.Getenv("SPOTIFY_REDIRECT_URI")

	log.Printf("🔄 Exchanging code for token...")
	log.Printf("Code: %s", code)
	log.Printf("Redirect URI: %s", redirectURI)

	data := url.Values{}
	data.Set("grant_type", "authorization_code")
	data.Set("code", code)
	data.Set("redirect_uri", redirectURI)

	req, err := http.NewRequest("POST", "https://accounts.spotify.com/api/token", strings.NewReader(data.Encode()))
	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.SetBasicAuth(clientID, clientSecret)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	log.Printf("📡 Spotify token response status: %d", resp.StatusCode)
	log.Printf("📡 Spotify token response: %s", string(body))

	if resp.StatusCode != 200 {
		return nil, fmt.Errorf("spotify returned status %d: %s", resp.StatusCode, string(body))
	}

	var token SpotifyToken
	if err := json.Unmarshal(body, &token); err != nil {
		return nil, err
	}

	return &token, nil
}
