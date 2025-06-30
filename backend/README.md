# Estrutura do Projeto

# Go Spotify API

Este é um projeto Go que implementa uma API para interagir com a Spotify API, utilizando
autenticação OAuth2 e endpoints para usuários, artistas, playlists e álbuns.

# Estrutura de Diretórios

```
├── spotify/ // nossa lib customizada
│ ├── spotify.go
│ └── spotify_test.go
├── handlers/ // endpoints HTTP (Chi)
│ ├── auth.go
│ ├── user.go
│ ├── artists.go
│ ├── playlists.go
│ └── albums.go
├── main.go
├── go.mod
└── .env
```

# Instruções de Uso
