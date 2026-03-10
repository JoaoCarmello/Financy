# Financy

Aplicação completa de **controle financeiro pessoal**, permitindo que usuários registrem receitas, despesas e organizem suas finanças através de categorias.

O projeto é dividido em duas partes principais:

- 🗄️ **Backend** – API responsável pelas regras de negócio e gerenciamento de dados  
- 🎨 **Frontend** – Interface web utilizada pelos usuários para interagir com o sistema  

---

## 👀 Demonstrativo do Projeto
![alt text](image.png)

---

# 🧱 Arquitetura do Projeto

Financy
 ├ backend
 │  └ API GraphQL
 │
 └ frontend
    └ Aplicação React
---

# 🚀 Tecnologias Utilizadas

## 🗄️ Backend

- Node.js
- TypeScript
- GraphQL
- Apollo Server
- Prisma ORM
- SQLite
- JWT
- bcryptjs

Responsável por:

- Autenticação de usuários
- Gerenciamento de categorias
- Gerenciamento de transações
- Regras de negócio da aplicação

---

## 🎨 Frontend

- React
- TypeScript
- Vite
- GraphQL
- Apollo Client
- TailwindCSS
- Shadcn UI
- React Hook Form
- Zod

Responsável por:

- Interface do usuário
- Dashboard financeiro
- Cadastro de categorias
- Cadastro de transações
- Autenticação

---

# 📊 Funcionalidades

- Cadastro de usuários
- Login com autenticação JWT
- Dashboard com resumo financeiro
- CRUD de categorias
- CRUD de transações
- Filtro e organização de transações
- Associação de transações com categorias

---

# 📜 Regras da Aplicação

- Cada usuário pode acessar apenas seus próprios dados
- Transações devem estar vinculadas a uma categoria
- Não é possível excluir categorias que possuam transações
- Sempre deve existir pelo menos uma categoria cadastrada

---

# ⚙️ Instalação

Clone o repositório:

```bash
git clone https://github.com/JoaoCarmello/Financy.git

Clone o repositório:

git clone https://github.com/JoaoCarmello/Financy.git

Entre na pasta do projeto:

cd Financy
```
#🗄️ Executando o Backend

```bash
Entre na pasta do backend:

cd backend

Instale as dependências:

pnpm install

Execute o servidor:

pnpm dev

A API estará disponível em:

http://localhost:4000/graphql
```
# 🎨 Executando o Frontend
```bash
Entre na pasta do frontend:

cd frontend

Instale as dependências:

pnpm install

Execute o projeto:

pnpm dev

A aplicação estará disponível em:

http://localhost:5173
```
# 🔑 Variáveis de Ambiente
```bash
Crie um arquivo .env no frontend:

VITE_BACKEND_URL=http://localhost:4000/graphql

No backend:

DATABASE_URL="file:./dev.db"
JWT_SECRET="secret"
```
#👨‍💻 Autor

Desenvolvido por João Carmello