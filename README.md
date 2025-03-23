# Blog MERN

Uma aplicação fullstack para criação e gerenciamento de postagens de blog, desenvolvida utilizando **MongoDB, Express, React e Node.js**.

## 🔗 Links do Projeto
- **Frontend:** [Blog MERN Frontend](https://blog-mern-frontend-beta.vercel.app/)
- **Backend:** [Blog MERN Backend](https://blog-mern-backend-y37e.onrender.com)

## 🛠 Tecnologias Utilizadas
- **Frontend:** React, React Router, Context API, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, JWT para autenticação
- **Deploy:** Vercel (Frontend) e Render (Backend)

## 💻 Funcionalidades
- Registro e login de usuários com autenticação JWT
- Criação, edição e exclusão de postagens
- Upload de imagens para ilustrar os posts
- Exibição das postagens com formatação adequada

## Como Usar
Como o projeto já está em deploy, você pode acessá-lo diretamente através do link do frontend: [Blog MERN Frontend](https://blog-mern-frontend-beta.vercel.app/)

Caso queira rodar localmente, siga os passos abaixo:

### 1️. Clonar o repositório
```bash
git clone https://github.com/ArielNunesS/blog-mern.git
```

### 2️. Instalar dependências
#### Frontend
```bash
cd client
npm install
```
#### Backend
```bash
cd server
npm install
```

### 3️. Executar o projeto

#### Backend
```bash
npm start
```
#### Frontend
```bash
npm run dev
```

## Estrutura do Projeto
```
blog-mern/
│-- api/             # Backend (Node.js + Express)
│   ├── models/      # Modelos do MongoDB
│   ├── routes/      # Rotas da API
│   ├── controllers/ # Lógica das rotas
│   ├── uploads/     # Diretório de imagens enviadas
│   ├── server.js    # Servidor Express principal
│-- client/          # Frontend (React.js)
│   ├── src/
│   │   ├── components/  # Componentes reutilizáveis
│   │   ├── pages/       # Páginas do site
│   │   ├── context/     # Gerenciamento de estado com Context API
│   │   ├── App.js       # Componente principal
│   │   ├── index.js     # Ponto de entrada do React
```

## 📄 Endpoints da API

### **Autenticação**
- `POST /login` - Realiza o login e retorna um token
- `POST /register` - Registra um novo usuário

### **Postagens**
- `GET /posts` - Retorna todas as postagens
- `POST /posts` - Cria uma nova postagem (requer autenticação)
- `GET /posts/:id` - Retorna uma postagem específica
- `PUT /posts/:id` - Atualiza uma postagem (requer autenticação)
- `DELETE /posts/:id` - Exclui uma postagem (requer autenticação)

## Autenticação
O projeto utiliza **JWT (JSON Web Token)** para autenticação, armazenando o token em cookies para manter a sessão ativa.

---
**Dúvidas ou sugestões?** Entre em contato!

[LinkedIn](https://www.linkedin.com/in/ariel-nunes-da-silva-2a1ba924b/)
