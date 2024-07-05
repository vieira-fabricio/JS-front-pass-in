document.addEventListener('DOMContentLoaded', function() {

    // Função para obter o valor de um parâmetro de URL
    function getQueryParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Obtém o eventId da URL e define no campo hidden
    const eventId = getQueryParameter('eventId');

    if (eventId) {
        obterDetalhesEvento(eventId);
    } else {
        document.getElementById('detalhesEvento').innerText = 'ID do evento não fornecido.';
    }

    function obterDetalhesEvento(eventId) {

        var url = `http://localhost:8080/events/${eventId}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao obter detalhes do evento: ' + response.statusText);
                }
                return response.json();
            })
            .then(evento => {
                exibirDetalhesEvento(evento)               
            })
            .catch(error => {
                console.error('Erro ao obter detalhes do evento', error);
                document.getElementById('detalhesEvento').innerText = 'ID do evento não fornecido.';
            });

    }

    // Função para criar e adicionar os detalhes do evento ao DOM
    function exibirDetalhesEvento(evento) {
        const detalhesEvento = document.getElementById('detalhesEvento');
        detalhesEvento.innerHTML = `
            <p><strong>Código do Evento:</strong> ${evento.eventDetail.id}</p>
            <p><strong>Nome do Evento:</strong> ${evento.eventDetail.title}</p>
            <p><strong>Detalhes:</strong> ${evento.eventDetail.details}</p>
            <p><strong>Quantidade de Vagas:</strong> ${evento.eventDetail.maximumAttendees}</p>
            <p><strong>Participantes confirmados:</strong> ${evento.eventDetail.attendeesAmount}</p>
        `;
    }

    document.getElementById('voltarBtn').addEventListener('click', function() {
        // Redirecionar para a página de criar novo evento
        window.location.href = '../index.html';
    });

    document.getElementById('registrarParticipanteBtn').addEventListener('click', function() {
        // Redirecionar para a página de criar novo evento
        window.location.href = `../novo-participante/registrarParticipante.html?eventId=${eventId}`;
    });
})