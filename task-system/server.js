const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Estados flexíveis das tarefas
const taskStates = [
  { id: 'pending', label: 'Pendente', color: '#ffc107' },
  { id: 'in_progress', label: 'Em Progresso', color: '#17a2b8' },
  { id: 'review', label: 'Em Revisão', color: '#6f42c1' },
  { id: 'blocked', label: 'Bloqueada', color: '#dc3545' },
  { id: 'completed', label: 'Concluída', color: '#28a745' }
];

// Armazenamento em memória (pode ser substituído por banco de dados)
let tasks = [];
let taskIdCounter = 1;

// Rotas
app.get('/', (req, res) => {
  const filter = req.query.filter || 'all';
  let filteredTasks = tasks;
  
  if (filter !== 'all') {
    filteredTasks = tasks.filter(task => task.state === filter);
  }
  
  res.render('index', {
    tasks: filteredTasks,
    states: taskStates,
    currentFilter: filter
  });
});

app.post('/tasks', (req, res) => {
  const { title, description, state } = req.body;
  
  const newTask = {
    id: taskIdCounter++,
    title: title || 'Sem título',
    description: description || '',
    state: state || 'pending',
    createdAt: new Date().toISOString()
  };
  
  tasks.push(newTask);
  res.redirect('/');
});

app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, description, state } = req.body;
  
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  
  if (taskIndex !== -1) {
    if (title) tasks[taskIndex].title = title;
    if (description) tasks[taskIndex].description = description;
    if (state) tasks[taskIndex].state = state;
    
    res.json({ success: true, task: tasks[taskIndex] });
  } else {
    res.status(404).json({ success: false, message: 'Tarefa não encontrada' });
  }
});

app.patch('/tasks/:id/state', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { state } = req.body;
  
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  
  if (taskIndex !== -1 && taskStates.find(s => s.id === state)) {
    tasks[taskIndex].state = state;
    res.json({ success: true, task: tasks[taskIndex] });
  } else {
    res.status(404).json({ success: false, message: 'Tarefa ou estado inválido' });
  }
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false, message: 'Tarefa não encontrada' });
  }
});

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/api/states', (req, res) => {
  res.json(taskStates);
});

app.listen(PORT, () => {
  console.log(`Sistema de Tarefas rodando em http://localhost:${PORT}`);
  console.log(`Estados disponíveis: ${taskStates.map(s => s.label).join(', ')}`);
});
