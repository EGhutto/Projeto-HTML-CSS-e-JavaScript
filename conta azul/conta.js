// Armazenar transações
const transactions = [];

// Elementos do DOM
const transactionForm = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');
const generateReportBtn = document.getElementById('generate-report');
const reportContainer = document.getElementById('report-container');

// Função para adicionar uma transação
transactionForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;

    // Criar a transação
    const transaction = {
        description,
        amount,
        category
    };

    // Adicionar a transação ao array
    transactions.push(transaction);

    // Limpar o formulário
    transactionForm.reset();

    // Atualizar a lista de transações
    updateTransactionList();
});

// Função para atualizar a lista de transações
function updateTransactionList() {
    // Limpar a lista atual
    transactionList.innerHTML = '';

    // Adicionar as transações à lista
    transactions.forEach(function (transaction, index) {
        const li = document.createElement('li');
        li.classList.add(transaction.category === 'Receita' ? 'income' : 'expense');
        
        li.innerHTML = `
            <span>${transaction.description}</span>
            <span>${transaction.category}</span>
            <span>R$ ${transaction.amount.toFixed(2)}</span>
        `;

        transactionList.appendChild(li);
    });
}

// Função para gerar relatório
generateReportBtn.addEventListener('click', function () {
    if (transactions.length === 0) {
        alert('Nenhuma transação foi registrada ainda.');
        return;
    }

    let totalIncome = 0;
    let totalExpense = 0;

    // Calcular totais
    transactions.forEach(function (transaction) {
        if (transaction.category === 'Receita') {
            totalIncome += transaction.amount;
        } else if (transaction.category === 'Despesa') {
            totalExpense += transaction.amount;
        }
    });

    // Gerar o conteúdo do relatório
    const reportHTML = `
        <h3>Relatório de Transações</h3>
        <p><strong>Total de Receita:</strong> R$ ${totalIncome.toFixed(2)}</p>
        <p><strong>Total de Despesa:</strong> R$ ${totalExpense.toFixed(2)}</p>
        <p><strong>Saldo Total:</strong> R$ ${(totalIncome - totalExpense).toFixed(2)}</p>
        <h4>Detalhes das Transações:</h4>
        <ul>
            ${transactions.map(transaction => `
                <li>
                    <strong>${transaction.description}</strong> - ${transaction.category} - R$ ${transaction.amount.toFixed(2)}
                </li>
            `).join('')}
        </ul>
    `;

    // Exibir relatório
    reportContainer.innerHTML = reportHTML;

    document.getElementById('generate-pdf').addEventListener('click', function () {
        if (transactions.length === 0) {
            alert('Nenhuma transação foi registrada ainda.');
            return;
        }
    
        let totalIncome = 0;
        let totalExpense = 0;
    
        // Calcular totais
        transactions.forEach(function (transaction) {
            if (transaction.category === 'Receita') {
                totalIncome += transaction.amount;
            } else if (transaction.category === 'Despesa') {
                totalExpense += transaction.amount;
            }
        });
    
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
    
        // Título do relatório
        doc.setFontSize(18);
        doc.text('Relatório Financeiro', 20, 20);
    
        // Adicionar totais
        doc.setFontSize(12);
        doc.text(`Total de Receita: R$ ${totalIncome.toFixed(2)}`, 20, 30);
        doc.text(`Total de Despesa: R$ ${totalExpense.toFixed(2)}`, 20, 40);
        doc.text(`Saldo Total: R$ ${(totalIncome - totalExpense).toFixed(2)}`, 20, 50);
    
        // Adicionar as transações detalhadas
        let y = 60;
        transactions.forEach(transaction => {
            doc.text(`${transaction.description} - ${transaction.category} - R$ ${transaction.amount.toFixed(2)}`, 20, y);
            y += 10;
        });
    
       
    });
    
    
});
