# Projeto de Automação de Ambientes com Docker e GitHub Actions
# Aluno: Davi Sousa de Farias

Este projeto implementa a automação da construção, testes e deploy de uma aplicação web moderna composta por três componentes principais:
- Front-End construído com React.
- Back-End construído com Node.js e Express.
- Banco de Dados utilizando PostgreSQL.

Cada componente é empacotado em contêineres Docker independentes, e o GitHub Actions é utilizado para automatizar o processo de build, testes e deploy para um ambiente de produção.

## Estrutura do Projeto

O projeto segue a estrutura abaixo:

├── backend/ │ ├── Dockerfile # Dockerfile para o backend │ └── ... # Código fonte do backend 
<br>
├── frontend/ │ ├── Dockerfile # Dockerfile para o frontend │ └── ... # Código fonte do frontend 
<br>
├── postgres/ # Diretório para o banco de dados PostgreSQL (se necessário) 
<br>
├── docker-compose.yml # Arquivo Docker Compose para facilitar a execução local 
<br>
└── .github/ └── workflows/ ├── build-and-test.yml # Workflow de build e teste └── deploy.yml # Workflow de deploy

### Dockerfiles

Cada componente possui seu próprio Dockerfile, conforme descrito abaixo:

- **Front-End**:
  - Baseado na imagem `node:14-alpine`.
  - Instala as dependências, compila o código e expõe a porta 3000.

- **Back-End**:
  - Baseado na imagem `node:14`.
  - Instala as dependências e expõe a porta 5000.

- **Banco de Dados**:
  - Utiliza a imagem `postgres:13`.
  - Configurado para aceitar conexões do back-end.

### Docker Compose

Para facilitar a execução local, o `docker-compose.yml` define os serviços necessários (frontend, backend e banco de dados) em uma rede comum chamada `mynetwork`. Cada serviço é configurado para permitir a comunicação entre si, com as devidas portas expostas para interação externa.

## Automação com GitHub Actions

### Workflow de Build e Teste (`build-and-test.yml`)

Este workflow executa os passos de build e teste de cada componente da aplicação. É acionado automaticamente em cada `push` ou `pull request` na branch `main` e realiza as seguintes etapas:

1. **Build das Imagens Docker**: Compila as imagens Docker para o front-end e o back-end.
2. **Testes Automatizados**: Executa testes para garantir que cada componente funcione corretamente.

### Workflow de Deploy (`deploy.yml`)

O workflow de deploy é responsável por publicar as imagens Docker na Docker Hub e simular o deploy em produção. Ele é acionado após o workflow de testes e inclui as etapas:

1. **Publicação de Imagens Docker**: Autentica-se no Docker Hub e publica as imagens para o front-end e back-end.
2. **Simulação de Deploy**: Simula o deploy das imagens Docker em um ambiente de produção.

### GitHub Secrets

As credenciais para o Docker Hub são armazenadas com segurança como `GitHub Secrets`:
- **DOCKER_USERNAME**: Nome de usuário do Docker Hub.
- **DOCKER_PASSWORD**: Senha do Docker Hub.

## Execução Local

Para executar o ambiente localmente usando Docker Compose, siga os passos abaixo:

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio

2. Inicio os serviços com o docker compose 
    ```bash
    docker-compose up --build
