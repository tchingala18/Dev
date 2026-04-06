# Sistema de Tarefas Flexível

Um sistema de gestão de tarefas com estados flexíveis e interface moderna.

## 🚀 Funcionalidades

- **Estados Flexíveis**: 5 estados personalizáveis para suas tarefas:
  - 🟡 Pendente
  - 🔵 Em Progresso
  - 🟣 Em Revisão
  - 🔴 Bloqueada
  - 🟢 Concluída

- **Interface Intuitiva**: Design moderno e responsivo
- **Filtros Rápidos**: Visualize tarefas por estado
- **API REST Completa**: endpoints para CRUD de tarefas
- **Indicadores Visuais**: Cores distintas para cada estado

## 📦 Instalação

```bash
cd task-system
npm install
```

## ▶️ Como Executar

```bash
node server.js
```

O sistema estará disponível em: `http://localhost:3000`

## 🔌 API Endpoints

### GET /api/tasks
Retorna todas as tarefas

### GET /api/states
Retorna todos os estados disponíveis

### POST /tasks
Cria uma nova tarefa
```json
{
  "title": "Título da tarefa",
  "description": "Descrição opcional",
  "state": "pending"
}
```

### PUT /tasks/:id
Atualiza uma tarefa existente

### PATCH /tasks/:id/state
Altera apenas o estado da tarefa
```json
{
  "state": "in_progress"
}
```

### DELETE /tasks/:id
Exclui uma tarefa

## 🎨 Personalização

Para adicionar ou modificar estados, edite o array `taskStates` no arquivo `server.js`:

```javascript
const taskStates = [
  { id: 'pending', label: 'Pendente', color: '#ffc107' },
  // Adicione novos estados aqui
];
```

## 📁 Estrutura do Projeto

```
task-system/
├── server.js          # Servidor principal e rotas API
├── views/
│   └── index.ejs      # Interface web
├── public/            # Arquivos estáticos
└── package.json       # Dependências do projeto
```

## 💡 Destaques

- **Flexibilidade**: Estados totalmente personalizáveis
- **Visual**: Cada estado tem cor única para fácil identificação
- **Responsivo**: Funciona em desktop e mobile
- **Simples**: Sem necessidade de banco de dados complexo (usa memória)

## ⚠️ Nota

Este sistema usa armazenamento em memória. Para produção, considere integrar com um banco de dados persistente.
