document.addEventListener('DOMContentLoaded', function() {
    const eventForm = document.getElementById('eventForm');

    eventForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o comportamento padrão de enviar o formulário

        // Obter os valores dos inputs
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const dateHour = document.getElementById('dataHora').value;
        const capacity = parseInt(document.getElementById('capacity').value);

        // Exemplo de manipulação dos dados (exibindo no console)
        console.log('Título do Evento:', title);
        console.log('Descrição:', description);
        console.log('Data/Hora:', dateHour);
        console.log('Capacidade de Pessoas:', capacity);

        // Aqui você pode adicionar mais lógica para enviar os dados para um servidor, por exemplo
        // Exemplo:
        createEvent(title, description, dateHour, capacity);
    });

    async function createEvent(title, description, dateHour, capacity) {
        
        const apiUrl = 'http://159.112.177.115:8080/events/';

        const data = {
            title: title,
            details: description,
            dateHour: dateHour,
            maximumAttendees: capacity
        };

        try {
            const response = await axios.post(apiUrl, data);

            // Exibe mensagem de sucesso
            showSuccessMessage();
        } catch (error) {
            console.error('Erro ao enviar dados para a api!', error);

            // Mostra o erro na tela para depuração
            const errorElement = document.getElementById('errorMessage');
            errorElement.textContent = 'Erro ao criar evento. Detalhes: ' + error.message;
            errorElement.style.display = 'block'; // Exibe a mensagem
        }
    }

    function showSuccessMessage() {

        const sucessMessage = document.getElementById('successMessage')
        sucessMessage.style.display = 'block'; // Exibe a mensagem

        // Esconde a mensagem após 3 segundos (3000 milissegundos)
        setTimeout(function(){
            sucessMessage.style.display = 'none'; // Esconde a mensagem após 3 segundos
        }, 3000);
        // Limpa o formulário após o registro bem-sucedido
        eventForm.reset();
    }
});

document.getElementById('btnVoltar').addEventListener('click', function() {
    // Redirecionar para a página de criar novo evento
    window.location.href = '../index.html';
});
