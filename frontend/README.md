# Spotify App - Navegação Completa com Sidebar

Aplicação completa com navegação estilo Spotify usando Next.js 15 App Router.

## ✨ Funcionalidades Implementadas

### 🏠 **Layout Principal**

- **Sidebar fixa** com navegação
- **Logo do Spotify** no topo
- **Menu de navegação** com 4 seções

### 🧭 **Navegação**

- **Home** (`/dashboard`) - Resumo geral sem header
- **Artistas** (`/dashboard/artistas`) - Top artistas com PageHeader
- **Playlists** (`/dashboard/playlists`) - Todas as playlists com PageHeader e botão "Criar playlist"
- **Perfil** (`/dashboard/perfil`) - Layout centralizado com avatar, nome e logout

### **Tela de Perfil**

- **Layout**: Centralizado verticalmente na tela
- **Estrutura**: Avatar (grande) → Nome + Email → Botão Logout
- **Alinhamento**: Vertical, centralizado, espaçamento consistente

## 🏗️ **Estrutura de Rotas**

```
/                          # Login page
/dashboard                 # Home (resumo sem header)
/dashboard/artistas        # Artistas (com PageHeader)
/dashboard/playlists       # Playlists (com PageHeader + botão criar)
/dashboard/perfil         # Perfil (layout centralizado + logout)
/callback                 # OAuth callback
```

## 🎨 **Layout Específico por Tela**

### **Home (`/dashboard`)**

- Sem PageHeader
- Header customizado com "Bem-vindo, [nome]!"
- 3 seções de dados (top 5 de cada)

### **Artistas (`/dashboard/artistas`)**

- PageHeader: "Top Artistas" / "Aqui você encontra seus artistas preferidos"
- Grid de cards de artistas

### **Playlists (`/dashboard/playlists`)**

- PageHeader: "Minhas playlists" / "Sua coleção pessoal de playlists"
- Botão "Criar playlist" (verde, estilo Spotify)

### **Perfil (`/dashboard/perfil`)**

- Layout centralizado na tela
- Avatar grande
- Nome e email centralizados

## 🚀 **Instalação**

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

## 📊 **Performance**

- ✅ Server-side rendering otimizado
- ✅ Client Components mínimos

## 🔧 **Integração Backend**

Funciona perfeitamente com seu backend Go:

- Autenticação via `/api/login` e `/api/callback`
- Dados via `/api/me`, `/api/artists`, `/api/playlists`, `/api/artists/:id/albums`

URL: [https://spotify-luiza-labs.vercel.app/](https://spotify-luiza-labs.vercel.app/)
