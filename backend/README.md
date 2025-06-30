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

1. **Instale as dependências**:
   ```bash
   go mod tidy
   ```
2. **Configure as variáveis de ambiente**:
   Crie um arquivo `.env` com as seguintes variáveis:
   ```env
   SPOTIFY_CLIENT_ID=seu_client_id
   SPOTIFY_CLIENT_SECRET=seu_client_secret
   SPOTIFY_REDIRECT_URI=http://localhost:8080/callback
   PORT=8080
   ```
3. **Execute o servidor**:

   ```bash
   go run main.go
   ```

4. **Deploy do ambiente**:
   O deploy do ambiente foi feito no Render, e você pode acessar a API através do seguinte link:
   - [https://spotify-luiza-labs.onrender.com](https://spotify-luiza-labs.onrender.com)
