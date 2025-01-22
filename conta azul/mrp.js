// Função para gerar uma tabela baseada no número de semanas para cada item
function generateTable(item, weeks) {
    const table = document.getElementById(item);
    table.innerHTML = `
        <tr>
            <th>Semana</th>
            <th>Necessidades Brutas</th>
            <th>Estoque Disponível</th>
            <th>Recebimentos Programados</th>
            <th>Necessidades Líquidas</th>
            <th>Liberação de Ordem</th>
        </tr>
    `;

    // Cria linhas dinâmicas
    for (let i = 1; i <= weeks; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${i}</td>
            <td><input type="number" value="0" oninput="updateAllTables()"></td>
            <td><input type="number" value="0" oninput="updateAllTables()"></td>
            <td><input type="number" value="0" oninput="updateAllTables()"></td>
            <td><input type="number" value="0" readonly></td>
            <td><input type="number" value="0" readonly></td>
        `;
        table.appendChild(row);
    }

    // Atualiza os cálculos iniciais
    updateTable(item);
}

// Função para atualizar os cálculos da tabela de um item específico
function updateTable(item) {
    const table = document.getElementById(item);
    const rows = table.rows;

    let estoqueDisponivelAnterior = 0;

    for (let i = 1; i < rows.length; i++) {
        const necessidadesBrutas = parseInt(rows[i].cells[1].querySelector("input").value) || 0;
        let estoqueDisponivel = i === 1 ? parseInt(rows[i].cells[2].querySelector("input").value) || 0 : estoqueDisponivelAnterior;
        const recebimentosProgramados = parseInt(rows[i].cells[3].querySelector("input").value) || 0;

        // Calcula Necessidades Líquidas: Necessidades Brutas - Estoque Disponível - Recebimentos Programados
        const necessidadesLiquidas = Math.max(necessidadesBrutas - estoqueDisponivel - recebimentosProgramados, 0);
        rows[i].cells[4].querySelector("input").value = necessidadesLiquidas;

        // Atualiza Estoque Disponível para a próxima semana
        estoqueDisponivelAnterior = estoqueDisponivel + recebimentosProgramados - necessidadesBrutas;

        // Se Necessidades Líquidas > 0, faz uma Liberação de Ordem igual a Necessidades Líquidas
        const liberacaoOrdem = necessidadesLiquidas > 0 ? necessidadesLiquidas : 0;
        rows[i].cells[5].querySelector("input").value = liberacaoOrdem;

        // Atualiza o Estoque Disponível para a próxima semana
        if (i < rows.length - 1) {
            rows[i + 1].cells[2].querySelector("input").value = Math.max(estoqueDisponivelAnterior, 0);
        }
    }

    // Atualiza o total de liberação de ordens no rodapé da página
    updateTotalOrdem(item);
}

// Função para calcular e mostrar o total de liberação de ordens para cada item
function updateTotalOrdem(item) {
    const table = document.getElementById(item);
    const rows = table.rows;
    let totalOrdem = 0;

    for (let i = 1; i < rows.length; i++) {
        totalOrdem += parseInt(rows[i].cells[5].querySelector("input").value) || 0;
    }

    document.getElementById(`total_${item}`).innerText = `Total de Liberação de Ordens: ${totalOrdem}`;
}

// Função para atualizar todas as tabelas ao mesmo tempo
function updateAllTables() {
    const items = ['Mesa', 'Tampo', 'Tronco', 'Suportes'];
    items.forEach(item => updateTable(item));
}

// Função para ajustar o número de semanas e gerar todas as tabelas
function adjustWeeks() {
    const weeks = parseInt(document.getElementById("weeks").value) || 1;
    const items = ['Mesa', 'Tampo', 'Tronco', 'Suportes'];

    items.forEach(item => generateTable(item, weeks));
}

// Inicializa as tabelas quando a página é carregada
window.onload = function() {
    adjustWeeks();
}
