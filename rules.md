## Geração de tipos da API (Swagger) — PRIMEIRO PASSO OBRIGATÓRIO

Antes de escrever **qualquer linha de código do frontend**, é obrigatório gerar os tipos da API a partir do Swagger.

### Comando padrão
Execute na raiz do projeto frontend:

```bash
npx swagger-typescript-api generate --path ./swagger.json
```

### Regras
- O `swagger.json` deve estar atualizado
- **Nunca editar manualmente** arquivos gerados
- Sempre regerar após mudanças no backend

---


# Frontend — Borracharia App (Next.js Mobile)
Guia de contexto para IA auxiliar no desenvolvimento do frontend

---

## Visão Geral
Criar um **frontend simples, mobile-first**, integrado com a **API Borracharia (NestJS)**.

- Backend separado
- Autenticação JWT
- Multi-tenant (borracharia)
- MVP focado em fluxo, não em design complexo

Base da API:
```
http://localhost:3003
```

---

## Stack obrigatória
- Next.js (App Router)
- Chakra UI
- TailwindCSS (ajustes pontuais)
- Zod (validação de formulários)
- TanStack React Query (fetch, cache, mutations)
- Zustand (estado global leve)

---

## Autenticação
### Endpoints
- `POST /auth/login`
- `POST /auth/register`

### Fluxo
1. Usuário acessa `/login`
2. Envia email + senha
3. Backend retorna `access_token`
4. Token armazenado no Zustand
5. Requisições autenticadas enviam:
   ```
   Authorization: Bearer <token>
   ```
6. Erro 401 → logout + redirect `/login`

---

## Telas do MVP

### Login
- Email
- Senha
- Botão Entrar
- Zod + Toast

Rota:
```
/login
```

---

### Home
- Logo centralizada
- Botão central: **Novo Pedido**
- Rodapé:
  - Add Pneus
  - Add Serviço

Rota:
```
/
```

---

### Cadastro de Pneus
Endpoint:
```
POST /pneus
```

Campos:
- tipo
- aro
- numeracao
- custo
- precoVenda
- quantidade

Rota:
```
/pneus/novo
```

---

### Cadastro de Serviços
Endpoint:
```
POST /servicos
```

Campos:
- descricao
- preco
- observacao

Rota:
```
/servicos/novo
```

---

### Novo Pedido
Endpoint:
```
POST /pedidos
```

Campos:
- clienteId
- itens
- quantidade
- formaPagamento
- observacoes

Rota:
```
/pedidos/novo
```

---

## Outros Endpoints
### Clientes
- `GET /clientes`
- `POST /clientes`
- `GET /clientes/{id}`

### Garantia
- `POST /garantia`
- `GET /garantia`
- `GET /garantia/{id}`

---

## Arquitetura de Pastas
```
src/
  app/
  components/
  lib/
  stores/
  features/
  styles/
```

---

## Variáveis de Ambiente
```
NEXT_PUBLIC_API_URL=http://localhost:3003
```

---

## Critérios de aceite
- Login funcional
- Token nas requisições
- Home conforme layout
- Cadastro de pneus
- Cadastro de serviços
- Criar pedido
- Código simples


---

## Autenticação Web (Next.js) — Cookie HttpOnly

> Este projeto é uma **aplicação Web em Next.js**, com **design mobile-first**.  
> Portanto, o fluxo de autenticação adotado é o **Fluxo Web via Cookies HttpOnly**.

### Por que usar Cookies HttpOnly no Next.js

#### 1. Segurança (XSS)
- O cookie `access_token` é **HttpOnly**
- O JavaScript do navegador **não consegue acessar o token**
- Impede roubo de sessão via ataques XSS
- Mais seguro que `localStorage` ou Zustand para tokens

#### 2. Server Actions & SSR
- O Next.js **reenvia cookies automaticamente** em requests do navegador
- Facilita:
  - Server Actions autenticadas
  - Renderização SSR com dados protegidos
- Não é necessário expor tokens no client

> Observação:  
> - Requests **client → API** precisam de `credentials: 'include'`
> - Requests **server → API** devem repassar cookies manualmente ou usar Route Handlers

#### 3. Middleware (proteção de rotas)
- O `middleware.ts` do Next.js pode validar a **presença do cookie**
- Se não existir sessão → redirecionar para `/login`
- Validação profunda do JWT fica a cargo do backend

---

## Fluxo de Login (Web)

Endpoint:
```
POST /auth/login
```

### Comportamento
- **Web (Browser)**:
  - Token salvo automaticamente em cookie `access_token` (HttpOnly)
- **Mobile / Outros**:
  - Token retornado no corpo da resposta (`access_token`)
  - Deve ser enviado via `Authorization: Bearer <token>`

> Este frontend **usa exclusivamente o fluxo Web**.

---

## Fluxo de Logout (Web)

Endpoint:
```
POST /auth/logout
```

### Comportamento
- Remove o cookie `access_token`
- Frontend deve redirecionar para `/login`

---

## Regras importantes para o Frontend

### Requests do Client (Browser)
- Sempre usar:
```
credentials: 'include'
```
- Necessário para envio automático do cookie

### Estado de Autenticação (Zustand)
- **Não armazenar token**
- Guardar apenas:
  - `isAuthenticated`
  - `user` (se existir endpoint `/me`)

### CORS (Backend)
O backend NestJS deve permitir:
- `credentials: true`
- `origin` = URL do frontend (ex: `http://localhost:3000`)

---

---

## Observação sobre arquivos gerados automaticamente

Alguns arquivos deste projeto (principalmente **clientes da API / types**) podem conter o seguinte cabeçalho:

```ts
/**
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */
```

### Regras importantes
- **Não editar manualmente** esses arquivos
- Eles são gerados a partir do **Swagger da API**
- Qualquer mudança deve ser feita:
  1. No backend (DTOs / Swagger decorators)
  2. Regerando os arquivos no frontend

### Objetivo
- Garantir tipagem consistente entre **NestJS (backend)** e **Next.js (frontend)**
- Evitar divergência de contratos de API
- Facilitar manutenção e evolução do projeto

---

---

## Geração de tipos da API (Swagger)

Este projeto utiliza **swagger-typescript-api** para gerar automaticamente os tipos e o client da API a partir do Swagger.

### Comando padrão
Execute o comando abaixo na raiz do projeto frontend:

```bash
npx swagger-typescript-api generate --path ./swagger.json
```

### Regras importantes
- O arquivo `swagger.json` deve estar atualizado e refletir o estado atual do backend
- Arquivos gerados **não devem ser editados manualmente**
- Sempre que houver mudança no backend:
  1. Atualizar Swagger no NestJS
  2. Exportar novo `swagger.json`
  3. Rodar novamente o comando acima

### Benefícios
- Tipagem forte e sincronizada com o backend
- Menos bugs de contrato (request/response)
- Melhor experiência com autocomplete e validação em tempo de desenvolvimento

---
