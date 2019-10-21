const express = require('express');

const server = express();

server.use(express.json());

const projects = [];


////////////// MIDDLEWARE QUE VERIFICA SE O PROJETO EXISTE  \\\\\\\\\\\\\\\\\
function checkProjectExists(req, res, next) {
  const { id } = req.params;

  const project = projects.find(p => p.id === id);

  if(!req.body.id) {
    return res.status(400).json({ error: 'Project not found'});
  }

  return next();
}

//////////////  MIDDLEWARE QUE MOSTRA O Nº DE REQUISIÇÕES \\\\\\\\\\\\\\\\\
server.use((req, res, next) => {
  console.count(`Requisições criadas`)

  return next();
});

//////////////  CREATE  \\\\\\\\\\\\\\\\\
server.post('/projects', checkProjectExists, (req, res) => {
  const { id, title } = req.body;
  
  const project = {
    id,
    title,
    tasks: []
  };
  
  projects.push(project);

  return res.json(project);
});

//////////////  LIST  \\\\\\\\\\\\\\\\\
server.get('/projects', (req, res) =>{
  return res.json(projects);
});

//////////////  EDIT \\\\\\\\\\\\\\\\\
server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);
  
  project.title = title;

  return res.json(project);
});

//////////////  DELETE \\\\\\\\\\\\\\\\\
server.delete('/projects/:id', checkProjectExists, (req, res) =>{
  const { id } = req.params;
  const project = projects.findIndex(p => p.id === id);

  projects.splice(project, 1);

  return res.json(project);
});

////////////// TASKS \\\\\\\\\\\\\\\\\
server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);

});




server.listen(3333);