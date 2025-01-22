let editIndex = -1;  // Variável para armazenar o índice da linha a ser editada

document.getElementById('sipocForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fornecedor = document.getElementById('fornecedor').value;
    const entrada = document.getElementById('entrada').value;
    const processo = document.getElementById('processo').value;
    const saida = document.getElementById('saida').value;
    const cliente = document.getElementById('cliente').value;

    // Se editIndex for -1, adiciona uma nova linha, caso contrário, edita a linha existente
    if (editIndex === -1) {
        adicionarLinha(fornecedor, entrada, processo, saida, cliente);
    } else {
        atualizarLinha(editIndex, fornecedor, entrada, processo, saida, cliente);
    }

    // Limpar o formulário após adicionar ou editar
    document.getElementById('sipocForm').reset();
    document.getElementById('submitBtn').textContent = "Adicionar Linha";  // Revert to Add
    document.getElementById('formTitle').textContent = "Adicionar Nova Linha ao SIPOC";
    editIndex = -1;  // Reset edit mode
});

// Função para adicionar uma nova linha
function adicionarLinha(fornecedor, entrada, processo, saida, cliente) {
    const tabela = document.getElementById('sipocTable').getElementsByTagName('tbody')[0];
    const novaLinha = tabela.insertRow();

    novaLinha.innerHTML = `
        <td>${fornecedor}</td>
        <td>${entrada}</td>
        <td>${processo}</td>
        <td>${saida}</td>
        <td>${cliente}</td>
        <td>
            <button class="edit-btn" onclick="editarLinha(this)">Editar</button>
            <button class="delete-btn" onclick="removerLinha(this)">Excluir</button>
        </td>
    `;
}

// Função para editar uma linha
function editarLinha(botao) {
    const linha = botao.parentNode.parentNode;
    
    // Preencher o formulário com os valores da linha selecionada
    document.getElementById('fornecedor').value = linha.cells[0].textContent;
    document.getElementById('entrada').value = linha.cells[1].textContent;
    document.getElementById('processo').value = linha.cells[2].textContent;
    document.getElementById('saida').value = linha.cells[3].textContent;
    document.getElementById('cliente').value = linha.cells[4].textContent;

    // Atualizar o título e o botão do formulário para salvar as alterações
    document.getElementById('submitBtn').textContent = "Salvar Alterações";
    document.getElementById('formTitle').textContent = "Editar Linha do SIPOC";
    
    // Armazenar o índice da linha que será editada
    editIndex = linha.rowIndex - 1;
}

// Função para atualizar uma linha
function atualizarLinha(index, fornecedor, entrada, processo, saida, cliente) {
    const tabela = document.getElementById('sipocTable').getElementsByTagName('tbody')[0];
    const linha = tabela.rows[index];

    linha.cells[0].textContent = fornecedor;
    linha.cells[1].textContent = entrada;
    linha.cells[2].textContent = processo;
    linha.cells[3].textContent = saida;
    linha.cells[4].textContent = cliente;
}

// Função para remover uma linha
function removerLinha(botao) {
    const linha = botao.parentNode.parentNode;
    linha.remove();
}
// Get references to the elements we'll be manipulating
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Function to toggle the theme
function toggleTheme() {
  body.classList.toggle('dark-theme');

  // Update the theme icon based on the current theme
  if (body.classList.contains('dark-theme')) {
    themeIcon.textContent = '🌞'; // Light mode icon
  } else {
    themeIcon.textContent = '🌙'; // Dark mode icon
  }
}

// Função para alternar o modo claro/escuro
document.getElementById('theme-toggle').addEventListener('click', function() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    
    // Alterna a classe 'dark' no body
    body.classList.toggle('dark');
    
    // Alterna a cor do ícone com base no tema
    if (body.classList.contains('dark')) {
        themeIcon.textContent = '🌜'; // Ícone de lua para o modo escuro
    } else {
        themeIcon.textContent = '🌞'; // Ícone de sol para o modo claro
    }

    // Armazena a preferência do usuário no localStorage
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
});

// Carrega a preferência de tema do usuário ao carregar a página
window.onload = function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        document.getElementById('theme-icon').textContent = '🌜';
    }
};

// Adiciona a lógica para o formulário SIPOC
document.getElementById('sipocForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fornecedor = document.getElementById('fornecedor').value;
    const entrada = document.getElementById('entrada').value;
    const processo = document.getElementById('processo').value;
    const saida = document.getElementById('saida').value;
    const cliente = document.getElementById('cliente').value;

    const table = document.getElementById('sipocTable').querySelector('tbody');
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td>${fornecedor}</td>
        <td>${entrada}</td>
        <td>${processo}</td>
        <td>${saida}</td>
        <td>${cliente}</td>
        <td><button class="deleteBtn">Excluir</button></td>
    `;

    // Limpa os campos do formulário após a adição
    document.getElementById('sipocForm').reset();

    // Adiciona a funcionalidade de exclusão de linha
    newRow.querySelector('.deleteBtn').addEventListener('click', function() {
        table.deleteRow(newRow.rowIndex - 1);
    });
});

