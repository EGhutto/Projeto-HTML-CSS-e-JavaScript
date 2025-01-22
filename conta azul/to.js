// to.js

const newProjectButton = document.getElementById('new-project-btn');
const projectList = document.getElementById('project-list');
const taskDetailSection = document.getElementById('task-detail');

let projects = JSON.parse(localStorage.getItem('projects')) || [];

// Função para atualizar a lista de projetos na tela
function renderProjects() {
  projectList.innerHTML = '';
  projects.forEach((project, index) => {
    const projectElement = document.createElement('div');
    projectElement.classList.add('project');
    projectElement.innerHTML = `
      <h3>${project.name}</h3>
      <ul>
        ${project.tasks.map(task => `
          <li class="task ${task.completed ? 'completed' : ''}" onclick="viewTaskDetails(${index}, ${project.tasks.indexOf(task)})">
            ${task.name}
          </li>
        `).join('')}
      </ul>
      <button onclick="addTask(${index})">Adicionar Tarefa</button>
    `;
    projectList.appendChild(projectElement);
  });
}

// Função para criar um novo projeto
newProjectButton.addEventListener('click', () => {
  const projectName = prompt('Nome do novo projeto:');
  if (projectName) {
    const newProject = {
      name: projectName,
      tasks: []
    };
    projects.push(newProject);
    saveProjects();
    renderProjects();
  }
});

// Função para adicionar uma nova tarefa ao projeto
function addTask(projectIndex) {
  const taskName = prompt('Nome da tarefa:');
  if (taskName) {
    projects[projectIndex].tasks.push({ name: taskName, completed: false });
    saveProjects();
    renderProjects();
  }
}

// Função para visualizar os detalhes de uma tarefa
function viewTaskDetails(projectIndex, taskIndex) {
  const task = projects[projectIndex].tasks[taskIndex];
  taskDetailSection.innerHTML = `
    <h2>Detalhes da Tarefa</h2>
    <p><strong>Nome:</strong> ${task.name}</p>
    <button onclick="toggleTaskCompletion(${projectIndex}, ${taskIndex})">
      ${task.completed ? 'Marcar como pendente' : 'Marcar como concluída'}
    </button>
  `;
}

// Função para alternar o status de conclusão de uma tarefa
function toggleTaskCompletion(projectIndex, taskIndex) {
  const task = projects[projectIndex].tasks[taskIndex];
  task.completed = !task.completed;
  saveProjects();
  renderProjects();
  viewTaskDetails(projectIndex, taskIndex); // Atualiza os detalhes
}

// Função para salvar os projetos no armazenamento local
function saveProjects() {
  localStorage.setItem('projects', JSON.stringify(projects));
}

// Renderiza os projetos quando a página é carregada
renderProjects();
document.getElementById('back-btn').addEventListener('click', function() {
    window.location.href = 'p1.html'; // Redireciona para a página index.html
  });
  