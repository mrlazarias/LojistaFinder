# LojistaFinder

Sistema moderno de extração e visualização de lojistas por categoria de produtos, com busca multi-marketplace, visual clean e ótima experiência de usuário.

## ✨ Visão Geral

O LojistaFinder permite buscar lojistas em marketplaces (Shopee, Mercado Livre, Amazon, etc) a partir de uma categoria, exibindo resultados com imagem, nome, plataforma, data e link direto para a loja/produto. O sistema utiliza dados do Google Shopping via SerpAPI e armazena lojistas no Supabase para histórico e analytics.

---

## 🚀 Funcionalidades

- Busca de lojistas por categoria (ex: "suplementos", "infantil")
- Multi-marketplace: Shopee, Mercado Livre, Amazon, Americanas, etc
- Cards modernos com imagem, nome, plataforma, data e link externo
- Sugestões de categorias e filtros de plataforma
- Persistência de lojistas no Supabase
- Visual responsivo, UX aprimorada, loading states e empty state ilustrado

---

## 🏗️ Arquitetura

- **Frontend:** React + Vite + TypeScript + TailwindCSS
  - Componentes modernos, responsivos e reutilizáveis
  - Busca, exibição e UX aprimorada
- **Backend:** Node.js + Express
  - Endpoint `/api/search-sellers` faz a busca na SerpAPI (Google Shopping)
  - Processa, agrupa e retorna lojistas com imagem, link, plataforma, etc
- **Banco de Dados:** Supabase (PostgreSQL)
  - Tabela `lojistas` para histórico e analytics
  - Campos: `id`, `nome_loja`, `link`, `categoria`, `plataforma`, `data_extracao`
- **Integrações:**
  - [SerpAPI](https://serpapi.com/) para busca de produtos/lojas no Google Shopping
  - [Supabase](https://supabase.com/) para persistência e queries

---

## 🛠️ Instalação e Uso

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/lojista-finder.git
cd lojista-finder
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` na pasta `server/` com sua chave da SerpAPI:

```
SERPAPI_KEY=sua_chave_aqui
```

Configure também as variáveis do Supabase no frontend (`.env` na raiz ou conforme integração).

### 3. Instale as dependências

```bash
# Backend
cd server
npm install

# Frontend
cd ../
npm install
```

### 4. Rode o backend

```bash
cd server
npm run dev
```

### 5. Rode o frontend

```bash
cd ..
npm run dev
```

Acesse em [http://localhost:5178](http://localhost:5178)

---

## 📦 Estrutura de Pastas

```
lojista-finder/
├── server/           # Backend Express (Node.js)
│   └── index.js      # API principal
├── src/              # Frontend React
│   ├── components/   # Componentes visuais
│   ├── pages/        # Páginas principais
│   ├── services/     # Integrações API/Supabase
│   └── ...
├── public/           # Assets estáticos (imagens, favicon, etc)
├── README.md         # Este arquivo
└── ...
```

---

## 🧩 Como funciona a busca

1. Usuário digita uma categoria e clica em buscar
2. Frontend chama `/api/search-sellers` no backend
3. Backend consulta SerpAPI (Google Shopping), processa e retorna lojistas
4. Frontend exibe cards modernos com imagem, nome, plataforma, data e link
5. Dados são salvos no Supabase para histórico e analytics

---

## 📝 Observações

- O campo de imagem não é salvo no banco, apenas exibido na busca
- O sistema é facilmente extensível para novas plataformas/campos
- Para produção, configure variáveis de ambiente e domínios adequados

---
