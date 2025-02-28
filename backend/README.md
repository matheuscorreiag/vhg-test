# Estrutura do Projeto

Este projeto segue uma arquitetura em camadas baseada em princípios de Clean Architecture, organizada em domínios. Abaixo estão as principais pastas e suas responsabilidades:

## 📁 `src`

### @types

Contém definições de tipos globais para o projeto.

### helpers

- `responses.ts`: Funções auxiliares para padronizar respostas HTTP.

### libs

- `prisma.module.ts` e `prisma.service.ts`: Módulos e serviços para configuração e integração com o Prisma ORM.

## Domínios

Cada domínio representa uma parte central da aplicação, organizado em três camadas principais:

### application

- `dto`: Define objetos de transferência de dados para entrada e saída.
- `mappers`: Converte entidades para DTOs e vice-versa.
- `use-cases`: Casos de uso que representam a lógica de negócios principal, incluindo testes unitários.

### domain

- `entities`: Define as entidades que representam os modelos do domínio.
- `repositories`: Define contratos para repositórios.
- `value-objects`: Objetos de valor que encapsulam lógica e validações específicas do domínio.

### infra

- `controllers`: Controladores responsáveis por receber requisições HTTP e acionar os casos de uso.
- `db`: Implementações dos repositórios utilizando o Prisma ORM.
- `mocks`: Implementações fictícias para testes.
- `modules`: Módulos para injeção de dependências.
- `guards`: Middlewares para segurança e autenticação.
- `decorators`: Decoradores personalizados para rotas públicas.

### Domínios Implementados

- `order`: Gerenciamento de pedidos.
- `product`: Gerenciamento de produtos.
- `user`: Gerenciamento de usuários e autenticação.

## Arquivos Principais

- `app.module.ts`: Módulo principal que importa e configura os módulos da aplicação.
- `main.ts`: Arquivo de bootstrap da aplicação.

### Testes

Testes unitários estão presentes nas pastas `__tests__`

## Como Instalar

Siga os passos abaixo para instalar e rodar a aplicação:

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente.
3. Suba o container Docker:
   ```bash
   docker compose up -d
   ```
4. Execute as migrações do Prisma:
   ```bash
   npx prisma migrate deploy
   ```
5. Popule o banco de dados com dados iniciais:
   ```bash
   npm run seed
   ```
   - Será criado o usuário padrão: **example@example.com** com a senha **123456**.
6. Inicie a aplicação em modo de desenvolvimento:
   ```bash
   npm run start:dev
   ```

---

## Observações

- Há um arquivo para a coleção de rotas VHG DEMO API.postman_collection.json para o postman
- Você pode usar também no Swagger, é só acessar a url http://localhost:3000/api
  no seu navegador
