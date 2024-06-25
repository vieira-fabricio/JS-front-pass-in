document.addEventListener("DOMContentLoaded", function() {

    // Função para obter o valor de um parâmetro de URL
    function getQueryParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }
    
    // Obtém o eventId da URL e define no campo hidden
    const eventId = getQueryParameter('eventId');
    if (eventId) {
        document.getElementById('eventId').value = eventId;
    }

    const form = document.getElementById('registrationForm');
    const loadingMessage = document.getElementById('loadingMessage');

    // Adiciona um listener de submit ao formulário
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obter os valores dos inputs
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const eventId = document.getElementById('eventId').value;

        const dataForm = {
            name: name,
            email: email,
            eventId: eventId
        };

        // Mostra a mensagem de carregamento
        loadingMessage.style.display = 'block';

        // Envia os dados do formulário para o backend
        enviarDados(dataForm);
    });

    // Função para enviar os dados do formulário via fetch API
    function enviarDados(data) {

        const eventId = data.eventId;
        
        url = `http://localhost:8080/events/${eventId}/attendees`;

        fetch(url, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('Erro ao registrar participação: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Oculta a mensagem de carregamento
            loadingMessage.style.display = 'none';
            
            alert('Participação registrada com sucesso!');
            // Limpa o formulário após o registro bem-sucedido
            form.reset();
        })
        .catch(error => {
            console.error('Erro ao registrar participação', error);
            alert('Erro ao registrar participação. Por favor, tente novamente.');

            // Em caso de erro, oculta a mensagem de carregamento
            loadingMessage.style.display = 'none';
        });
    }
});
