# Financy - 🔙 Backend

API GraphQL responsável pelo gerenciamento de usuários, categorias e transações da aplicação **Financy**.

Este serviço fornece autenticação via JWT e operações CRUD para gerenciamento de finanças pessoais.

## 🚀 Funcionalidades e Regras
```markdown
- O usuário pode criar uma conta e fazer login
- O usuário pode ver e gerenciar apenas as transações e categorias criadas por ele
- Deve ser possível criar uma transação
- Deve ser possível deletar uma transação
- Deve ser possível editar uma transação
- Deve ser possível listar todas as transações
- Deve ser possível criar uma categoria
- Deve ser possível deletar uma categoria
- Deve ser possível editar uma categoria
- Deve ser possível listar todas as categorias
````

## 🧱 Tecnologias Utilizadas

- Node.js
- TypeScript
- GraphQL
- Apollo Server
- TypeGraphQL
- Prisma ORM
- SQLite
- JWT
- bcryptjs



## Scripts

```markdown
pnpm install — *instala as dependências*
pnpm prisma migrate dev — *executa as migrations do banco*
pnpm seed — *popula o banco com dados iniciais*
pnpm dev — *inicia o servidor*
```
## ⚙️ Configuração do Ambiente

```markdown
JWT_SECRET=your_jwt_secret_here 
DATABASE_URL=your_database_url_here
```