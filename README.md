# RetroDrive Autopeças

Esta é uma Single Page Application (SPA) para uma loja de autopeças, desenvolvida com React e TypeScript. O aplicativo gerencia produtos, categorias, fornecedores e clientes.

**Observação:** As funcionalidades de dados (visualização, adição, edição, exclusão) **requerem que o backend da API (`json-server`) esteja rodando localmente** para funcionar. O site no GitHub Pages serve apenas o frontend estático.

## Índice

* [Estrutura do Projeto](#estrutura-do-projeto)
* [Como Executar o Projeto Localmente](#como-executar-o-projeto-localmente)
    * [Pré-requisitos](#pré-requisitos)
    * [Instalação](#instalação)
    * [Execução](#execução)
* [Deploy](#deploy)
* [Contato](#contato)

## Estrutura do Projeto

my-ecommerce-spa/
├── public/                 # Arquivos estáticos (index.html, favicons, etc.)
├── src/                    # Código-fonte da aplicação React
│   ├── components/         # Componentes React
│   │   └── NavBar/
│   ├── context/            # Contextos React (e.g., ProductContext)
│   ├── pages/              # Páginas da aplicação (e.g., HomePage, ProductsPage)
│   ├── routes/             # Definição de rotas (AppRoutes.tsx)
│   ├── services/           # Lógica de comunicação com a API (e.g., api.ts)
│   ├── types/              # Definições de tipos TypeScript
│   ├── App.tsx             # Componente principal
│   ├── index.tsx           # Ponto de entrada
│   ├── global.css          # Estilos globais
│   └── react-app-env.d.ts  # Arquivo de ambiente TypeScript
├── db.json                 # Dados para o json-server
├── package.json            # Metadados do projeto e scripts npm
├── package-lock.json       # Informações detalhadas das dependências
├── tsconfig.json           # Configurações do TypeScript
└── README.md               # Este arquivo README


## Como Executar o Projeto Localmente

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/en/download/) (que inclui o npm) instalado em sua máquina.

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/ISM9182/Ecommerce-RetroDrive.git](https://github.com/ISM9182/Ecommerce-RetroDrive.git)
    ```
2.  **Navegue até a pasta do projeto (a pasta interna):**
    ```bash
    cd Ecommerce-RetroDrive/my-ecommerce-spa
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```

### Execução

Para que a aplicação funcione completamente, você precisa iniciar o frontend e o backend (API falsa) em terminais separados.

1.  **Inicie o Backend (API Falsa) (em um terminal):**
    Na pasta `my-ecommerce-spa` (a interna do projeto), execute:
    ```bash
    json-server --watch db.json --port 5000
    ```
    O `json-server` será executado em `http://localhost:5000`.

2.  **Inicie o Frontend (em um NOVO terminal):**
    Navegue novamente para a pasta `my-ecommerce-spa` (a interna do projeto):
    ```bash
    cd C:\UFC\Disciplina de Web\Trabalho 2\my-ecommerce-spa\my-ecommerce-spa
    ```
    Em seguida, execute:
    ```bash
    npm start
    ```
    Isso abrirá o aplicativo React em `http://localhost:3000`.
## Deploy

O site estático está implantado no [GitHub Pages](https://ism9182.github.io/Ecommerce-RetroDrive/).

## Contato

* **Nome:** Ismael
* **GitHub:** [https://github.com/ISM9182](https://github.com/ISM9182)
