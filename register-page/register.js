const loginButton = document.querySelector('#button-id');

if (loginButton) {
  loginButton.addEventListener('click', async () => {

    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const senhaConfirmation = document.getElementById('password_confimation').value;

    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
       nome, email, senha, senhaConfirmation
      })
    });

    if (response.ok) {
      const result = await response.text();
      alert(result);
    } else {
      alert('Usuário ou senha inválidos!'); 
    }
  });
}


const data = await response.json();

if (response.ok) {
                // Armazena o token no localStorage
                localStorage.setItem('token', data.token);

                // Redireciona para a página do dashboard
                window.location.href = "../dashboard/dashboard.html";
            } else {
                // Exibe mensagem de erro
                alert('Erro ao fazer login: ' + data.msg);
            }