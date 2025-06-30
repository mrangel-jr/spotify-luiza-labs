package handlers

import (
	"context"
	"fmt"
	"net/http"
	"strings"
)

type contextKey string

const tokenContextKey = contextKey("token")

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")

		// Debug: Log do header recebido
		if authHeader != "" {
			fmt.Printf("[AuthMiddleware] Header Authorization: %s...\n", authHeader)
		}

		if authHeader != "" {
			// 🔥 CORREÇÃO: Extrair apenas o token, removendo "Bearer " se presente
			token := extractToken(authHeader)

			if token != "" {
				fmt.Printf("[AuthMiddleware] Token extraído e armazenado")
				ctx := context.WithValue(r.Context(), tokenContextKey, token)
				next.ServeHTTP(w, r.WithContext(ctx))
				return
			} else {
				fmt.Println("[AuthMiddleware] Token vazio após extração")
			}
		} else {
			fmt.Println("[AuthMiddleware] Nenhum header Authorization encontrado")
		}

		next.ServeHTTP(w, r)
	})
}

func extractToken(authHeader string) string {
	// Remover espaços em branco
	authHeader = strings.TrimSpace(authHeader)

	// Se começa com "Bearer ", remover
	if strings.HasPrefix(authHeader, "Bearer ") {
		return strings.TrimSpace(strings.TrimPrefix(authHeader, "Bearer "))
	}

	return authHeader
}

func RequireAuth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token := r.Context().Value(tokenContextKey)
		if token == nil {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func getToken(r *http.Request) string {
	authHeader := r.Header.Get("Authorization")

	if authHeader == "" {
		fmt.Println("[getToken] Nenhum header Authorization encontrado")
		return ""
	}
	token := extractToken(authHeader)

	fmt.Printf("[getToken] Token obtido do header: %s...\n", token[:20]) // Log apenas os primeiros 20 caracteres
	return token
}
