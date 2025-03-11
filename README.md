# RecomendeMe Challenge

## Descrição do projeto

O **RecomendeMe** é uma aplicação frontend desenvolvida como parte de um desafio técnico para a vaga de Desenvolvedor Frontend. O objetivo da aplicação é exibir recomendações de livros, filmes e músicas baseadas em conceitos psicológicos diversos.

## Demonstração

A aplicação resultante pode ser acessada pelo link abaixo:
https://recomendemechallenge.vercel.app/

Documentação da API de recomendações criada:
https://recomendeme-api-deployment.onrender.com/swagger-ui/index.html#/

_Nota: como a aplicação e a API estão hospedadas em plataformas gratuitas, as requisições podem levar alguns segundos para serem processadas no primeiro acesso._

## Tecnologias utilizadas

### Frontend

- **Framework**: React.js + Vite
- **Linguagem**: TypeScript
- **Gerenciamento de estado**: Context API
- **Estilização**: Tailwind CSS
- **Biblioteca UI**: Shadcn UI
- **Autenticação**: Firebase Auth
- **Cache**: React Query
- **Validações**: Zod
- **Hospedagem**: [Vercel](https://recomendemechallenge.vercel.app/)

### Backend

- **Framework**: Spring Boot
- **Linguagem**: Java
- **Banco de Dados**: Neon DB
- **Documentação**: [Swagger](https://recomendeme-api-deployment.onrender.com/swagger-ui/index.html#/)
- **Hospedagem**: Render

## APIs consumidas

- [Google Books API](https://developers.google.com/books) - Livros
- [The Movie DB](https://developer.themoviedb.org/reference/) - Filmes
- [Last FM API](https://www.last.fm/api) - Músicas/álbuns

## Estrutura de dados

Para manipular os dados da recebidos da API de recomendações criada, foi implementada uma lista ligada em TypeScript.

O código-fonte da implementação pode ser encontrado em:
`src/utils/data-structures/linkedList.ts`

## Funcionalidades

- Cadastro de novos usuários via Firebase Auth;
- Login para usuários cadastrados;
- Exibição de recomendações categorizadas em livros, filmes e músicas;
- Possibilidade de marcar/desmarcar recomendações de outros usuários;
- Barra de pesquisa para filtrar recomendações;
- Possibilidade de adição de nova recomendação;
- Listagem de recomendações cadastradas pelo usuário;
- Possibilidade de exclusão de recomendação criada.
  
## Configuração do ambiente

### Variáveis de ambiente - Frontend

1. Primeiramente é necessário criar um projeto no console do Firebase e habilitar o recurso `Authentication`.

2. Crie um arquivo `.env` na raiz do projeto frontend e adicione as seguintes configurações:

```
VITE_RECOMENDEME_API=http://localhost:8080

VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_auth_domain
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id
VITE_FIREBASE_APP_ID=seu_app_id

VITE_GOOGLE_BOOKS_API_URL=google_books_api_url

VITE_THE_MOVIE_DB_API_URL=the_movie_db_api_url
VITE_THE_MOVIE_DB_API_TOKEN=the_movie_db_access_token

VITE_LAST_FM_API_URL=last_fm_api_url
VITE_LAST_FM_API_KEY=last_fm_api_key
```

### Variáveis de ambiente - Backend

1. Antes de iniciar a aplicação, é necessário configurar um banco de dados PostgreSQL. Certifique-se de que o PostgreSQL está instalado e crie um banco de dados com o nome desejado.

2. No backend, configure as variáveis de ambiente conforme o exemplo abaixo:

```
DATASOURCE_URL=jdbc:postgresql://localhost:5432/nome_do_db
DATASOURCE_USER=usuario_postgres
DATASOURCE_PASSWORD=senha_do_db

FRONTEND_URL=http://localhost:3000
```

## Como rodar o projeto localmente

### Frontend

1. Clone o repositório:
   ```bash
   git clone https://github.com/LucasPaulinoH/recomende-me-frontend.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd recomende-me-frontend
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
   ou 

   ```bash
   yarn
   ```
4. Inicie o servidor local:
   ```bash
   npm run dev
   ```
   ou
   ```bash
   yarn dev
   ```
5. O frontend estará disponível em `http://localhost:3000`

### Backend

1. Clone o repositório:
   ```bash
   git clone https://github.com/LucasPaulinoH/recomende-me-backend.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd recomende-me-backend
   ```
3. Compile e execute o projeto com Maven:
   ```bash
   mvn spring-boot:run
   ```
4. A API estará disponível em `http://localhost:8080`
5. A documentação Swagger pode ser acessada em `http://localhost:8080/swagger-ui/index.html`
