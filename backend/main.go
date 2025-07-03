package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"spotify-luiza-labs/middleware"
	"spotify-luiza-labs/routes"

	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	var corsMiddleware = middleware.SetupCORS()

	r := routes.SetupRoutes(corsMiddleware)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Println("Servidor iniciado em http://localhost:" + port)
	server := &http.Server{
		Addr:         ":" + port,
		Handler:      r,
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}
	err := server.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}
}
