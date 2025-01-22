// Função para alternar entre os formulários de login e cadastro
function toggleForms() {
    var loginForm = document.getElementById('login-form');
    var signupForm = document.getElementById('signup-form');
    
    // Alternar a visibilidade dos formulários
    if (loginForm.style.display === "none") {
        loginForm.style.display = "block";
        signupForm.style.display = "none";
    } else {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
    }
}

// Função para tratar o cadastro de usuário
function signup() {
    var username = document.getElementById('signup-username').value.trim();
    var email = document.getElementById('signup-email').value.trim();
    var password = document.getElementById('signup-password').value;
    var confirmPassword = document.getElementById('signup-confirm-password').value;

    // Validação de campos vazios
    if (!username || !email || !password || !confirmPassword) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // Validação de e-mail
    if (!validateEmail(email)) {
        alert("Por favor, insira um e-mail válido!");
        return;
    }

    // Verificar se as senhas são iguais
    if (password !== confirmPassword) {
        alert("As senhas não coincidem!");
        return;
    }

    // Aqui você pode adicionar a lógica para enviar os dados para o servidor
    console.log("Cadastro bem-sucedido! Usuário:", username, "E-mail:", email);

    // Limpar os campos após o envio
    document.getElementById('signupForm').reset();
    
    // Redirecionar para a página da conta após o cadastro
    window.location.href = "p1.html"; // Redireciona para a página de conta
}

// Função para o login
function login() {
    var username = document.getElementById('login-username').value.trim();
    var password = document.getElementById('login-password').value;

    // Validação de campos vazios
    if (!username || !password) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // Aqui você pode adicionar a lógica de autenticação
    console.log("Login bem-sucedido! Usuário:", username);

    // Limpar os campos após o login
    document.getElementById('loginForm').reset();

    // Redirecionar para a página da conta após o login
    window.location.href = "p1.html"; // Redireciona para a página de conta
}

// Função para validar o formato do e-mail
function validateEmail(email) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
