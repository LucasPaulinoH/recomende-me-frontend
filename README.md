# RecomendeMe Challenge

## Descrição do projeto

Este projeto é um desafio frontend focado na criação de um atlas digital interativo. A aplicação integra-se à [REST Countries API](https://restcountries.com/) para exibir informações detalhadas sobre diversos países. O principal objetivo é demonstrar habilidades técnicas em desenvolvimento frontend, incluindo integração com serviços externos, organização de código e boas práticas de programação.

## Demonstração

A aplicação está hospedada no Vercel e pode ser acessada através do seguinte link:

[https://helloworldatlas.vercel.app](https://helloworldatlas.vercel.app)

## Funcionalidades

- **Cadastro**: Novos usuários podem ser cadastrados através do Firebase Auth;
- **Login**: Permite que usuários autenticados acessem a aplicação;
- **Listagem de Países**: Exibe uma lista paginada de países com informações básicas e filtro de busca para encontrar países específicos;
- **Detalhes do País**: Ao selecionar um país, o usuário pode visualizar informações detalhadas sobre ele.

## Tecnologias

- **Framework**: React.js + Vite
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Gerenciamento de estado**: Context API
- **Cache de dados**: React Query
- **Autenticação**: Firebase Auth
- **API**: REST Countries API
- **Hospedagem**: Vercel

## Instalação e uso

Siga os passos abaixo para executar o projeto localmente:

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/LucasPaulinoH/hello-world-atlas.git
   cd hello-world-atlas
   ```

2. **Instale as dependências**:

    npm

    ```bash
    npm install
    ```

    Ou yarn

    ```bash
    yarn
    ```

1. **Configure as variáveis de ambiente**:

    Primeiramente é necessário criar um projeto no console do Firebase e habilitar o recurso `Authentication`.

   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

    ```env
    VITE_FIREBASE_API_KEY=sua_api_key
    VITE_FIREBASE_AUTH_DOMAIN=seu_auth_domain
    VITE_FIREBASE_PROJECT_ID=seu_project_id
    VITE_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id
    VITE_FIREBASE_APP_ID=seu_app_id

    VITE_REST_COUNTRIES_API_URL=https://restcountries.com/v3.1
    ```

    _Nota: Substitua os valores pelas respectivas credenciais do seu projeto Firebase Auth._

2. **Inicie o servidor de desenvolvimento**:

    npm

    ```bash
    npm run dev
    ```

    Ou yarn

    ```bash
    yarn dev
    ```

3. **Acesse a aplicação**:

Abra o navegador e navegue até `http://localhost:3000/`.

## Estrutura do Projeto

A estrutura de pastas e arquivos do projeto é organizada da seguinte forma:

```
/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── styles/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── ...
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
└── ...
```

- **public/**: Contém assets públicos
- **src/**: Contém o código-fonte da aplicação
  - **assets/**: Arquivos de mídia
  - **components/**: Componentes reutilizáveis da interface
  - **context/**: Definição dos contextos para gerenciamento de estado
  - **hooks/**: Hooks personalizados
  - **pages/**: Páginas da aplicação
  - **routes/**: Configuração das rotas da aplicação
  - **services/**: Módulo de comunicação com API e serviços
  - **styles/**: Arquivos de estilização
  - **types/**: Definições de tipos
  - **utils/**: Funções utilitárias auxiliares

