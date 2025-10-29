# Sistema de Gestão de Itens Perdidos e Achados

## Visão Geral
Sistema web de gestão de inventário para itens perdidos e encontrados, desenvolvido para organizações. Permite o cadastro, consulta e rastreamento transparente de itens extraviados, reduzindo investimentos em compras duplicadas e agilizando o processo de recuperação.

## Tecnologias
- **Frontend**: React + TypeScript, Wouter (routing), TanStack Query, Shadcn UI, Tailwind CSS
- **Backend**: Express.js, TypeScript
- **Armazenamento**: In-memory storage (MemStorage)
- **Design**: Minimalista SaaS em tons de azul e branco, inspirado em Linear/Notion

## Estrutura do Projeto

### Frontend (`client/src/`)
- **pages/dashboard.tsx**: Página principal com grid de itens e busca/filtros
- **components/**: Componentes reutilizáveis
  - `item-card.tsx`: Card de item com imagem, nome, local, data e status
  - `item-detail-dialog.tsx`: Modal com detalhes completos do item
  - `item-form-dialog.tsx`: Formulário para cadastrar novos itens
  - `search-filter-bar.tsx`: Barra de busca com filtros por categoria e status
  - `empty-state.tsx`: Estado vazio com ilustração
  - `loading-skeleton.tsx`: Skeletons para carregamento
  - `theme-provider.tsx` e `theme-toggle.tsx`: Sistema de tema claro/escuro

### Backend (`server/`)
- **routes.ts**: Endpoints da API
  - `GET /api/categories`: Lista todas as categorias
  - `POST /api/categories`: Cria nova categoria
  - `GET /api/items`: Lista todos os itens
  - `GET /api/items/:id`: Busca item por ID
  - `POST /api/items`: Cria novo item
  - `PATCH /api/items/:id`: Atualiza item
  - `DELETE /api/items/:id`: Remove item
- **storage.ts**: Interface de armazenamento em memória com dados iniciais

### Schema (`shared/schema.ts`)
- **users**: Usuários do sistema (id, username, password, role)
- **categories**: Categorias de itens (id, name, description)
- **items**: Itens perdidos/encontrados (id, name, description, categoryId, location, dateFound, status, imageUrl, claimedBy, claimedDate, createdBy, createdAt)

## Funcionalidades
1. **Consulta Pública**: Grid de itens com busca e filtros por categoria/status
2. **Cadastro de Itens**: Formulário completo para registrar itens encontrados
3. **Edição de Itens**: Atualização de informações de itens existentes
4. **Exclusão de Itens**: Remoção de itens com diálogo de confirmação
5. **Marcar como Recuperado**: Atualização de status com registro de data e responsável
6. **Detalhes do Item**: Modal com todas as informações e histórico
7. **Busca e Filtros**: Sistema de busca por texto + filtros de categoria e status
8. **Estados Vazios**: Mensagens amigáveis quando não há itens
9. **Dark Mode**: Suporte completo a tema claro e escuro
10. **Responsivo**: Layout adaptável mobile-first
11. **Menu de Ações**: Dropdown com opções de editar, excluir e marcar como recuperado em cada card

## Design System
- **Cores**: Tons de azul (#2563EB) e branco/cinza
- **Tipografia**: Inter (Google Fonts)
- **Espaçamento**: Sistema de 4px base
- **Componentes**: Shadcn UI com customização
- **Estados**: Hover e active com elevação sutil

## Dados Iniciais
O sistema é pré-configurado com 6 categorias:
- Eletrônicos
- Documentos
- Acessórios Pessoais
- Vestuário
- Chaves
- Outros

## Como Executar
1. Instalar dependências: `npm install`
2. Iniciar aplicação: `npm run dev`
3. Acessar: http://localhost:5000

## Status de Desenvolvimento
✅ Schema e tipos definidos
✅ Componentes frontend completos com CRUD completo
✅ Backend API implementado com validação Zod em todos endpoints
✅ Integração frontend-backend funcionando
✅ Edição, exclusão e marcação de itens implementados
🔄 Testes e2e pendentes
