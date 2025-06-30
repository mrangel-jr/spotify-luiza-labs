# Spotify App - Navegação Completa com Sidebar

Aplicação completa com navegação estilo Spotify usando Next.js 15 App Router.

## ✨ Funcionalidades Implementadas

### 🏠 **Layout Principal**

- **Sidebar fixa** com navegação
- **Logo do Spotify** no topo
- **Menu de navegação** com 4 seções
- **Opção de instalar PWA**

### 🧭 **Navegação**

- **Home** (`/dashboard`) - Resumo geral sem header
- **Artistas** (`/dashboard/artistas`) - Top artistas com PageHeader
- **Playlists** (`/dashboard/playlists`) - Todas as playlists com PageHeader e botão "Criar playlist"
- **Perfil** (`/dashboard/perfil`) - Layout centralizado com avatar, nome e logout

### 🎯 **Estado Ativo**

- Highlight automático do item ativo
- Navegação com Next.js Link
- Transições suaves

### 📱 **PWA Ready**

- Detecção automática de instalação
- Botão "Instalar PWA" quando disponível

## 🎨 **Design System Atualizado**

### **PageHeader**

- **Localização**: Apenas nas telas Artistas e Playlists
- **Artistas**: "Top Artistas" / "Aqui você encontra seus artistas preferidos"
- **Playlists**: "Minhas playlists" / "Sua coleção pessoal de playlists"
- **Estilos**: Name (28px, font-weight 600), Description (16px, font-weight 400)
- **Layout**: Alinhado à esquerda, gap entre name e description

### **Botões de Ação**

- **Logout**: Apenas na tela de perfil, estilo red button, centralizado
- **Criar Playlist**: Na tela de playlists, estilo green button igual ao "Entrar"
- **Layout**: Mesmo estilo do botão "Entrar" com cores diferentes

### **Tela de Perfil**

- **Layout**: Centralizado verticalmente na tela
- **Estrutura**: Avatar (grande) → Nome + Email → Botão Logout → Cards informativos
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
- Sem botões de ação

### **Playlists (`/dashboard/playlists`)**

- PageHeader: "Minhas playlists" / "Sua coleção pessoal de playlists"
- Botão "Criar playlist" (verde, estilo Spotify)
- Grid de cards de playlists

### **Perfil (`/dashboard/perfil`)**

- Layout centralizado na tela
- Avatar grande (128px)
- Nome e email centralizados
- Botão "Sair" (vermelho, estilo similar ao "Entrar")
- Cards informativos abaixo

## 🚀 **Instalação**

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

## 📊 **Performance**

- ✅ Server-side rendering otimizado
- ✅ Client Components mínimos
- ✅ Bundle JavaScript reduzido
- ✅ Navegação instantânea
- ✅ SEO completo

## 🔧 **Integração Backend**

Funciona perfeitamente com seu backend Go:

- Autenticação via `/auth/login` e `/auth/callback`
- Dados via `/user`, `/artists`, `/playlists`, `/albums`
- Token JWT gerenciado automaticamente

## 🎵 **UX/UI Melhorado**

- **Botão de logout**: Apenas onde faz sentido (perfil)
- **Headers contextuais**: Informações específicas por seção
- **Ações relevantes**: Criar playlist na tela certa
- **Hierarquia visual**: Layout limpo e organizado

Aplicação Spotify completa e refinada!
